import { dir } from 'console';
import { Dir } from 'fs';
import { utils } from 'mocha';
import { stringify } from 'querystring';
import {
	TextDocument
} from 'vscode-languageserver-textdocument';
import { TextDocumentChangeEvent, TextDocuments, _Connection } from 'vscode-languageserver/node';
import { ErlangUtils } from './erlang_utils';
import { Util } from './util';

class Cached<T> {
    hash: number = -1;
    value: T | undefined
    private _value: any = undefined;

    constructor(value?: T) {
        Object.defineProperty(this, "value", {
            get(): T {
                console.trace(`Getting value of Cache`);
                console.log("Returning %O", this._value)
                return this._value;
            },
            set(val) {
                console.trace(`Setting value of Cache`);
                console.log("Setting value to %O", val);
                let stringVal = val === undefined ? "" : JSON.stringify(val);
                console.log("JSON of %O is %O", val, stringVal);
                this.hash = Util.Hash.cyrb53(stringVal);
                console.log("Hash of %O is %O", stringVal, this.hash);
                this._value = val;
            }
        });
        this.value = value;
    }
}

class Block {
    type: Block.Type
    value: any

    constructor(type: Block.Type, value: any) {
        this.type = type;
        this.value = value;
    }
}

namespace Block {
    export enum Type {
        Directive,
        Function,
        Comment
    }
    export namespace Directives {
        export enum Type {
            UNKNOWN,
            Module,
            Import,
            Export,
            Include,
            IncludeLib,
            Record,
            Define,
            Undefine,
            Compile,
            BeginIf,
            BeginIfDef,
            BeginIfNotDef,
            Else,
            ElseIf,
            EndIf,
            CompileWarning,
            CompileError
        }
        export abstract class Directive {
            readonly incomplete: boolean;
            
            protected constructor(incomplete = false) {
                this.incomplete = incomplete;
            }

            // This isn't yet supported by Typescript
            // static abstract parse(args: string[]): Directive | null;
        }
        export class Module extends Directive {
            readonly moduleName: string;

            private constructor(moduleName: string, incomplete: boolean = false) {
                super(incomplete);
                this.moduleName = moduleName;
            }

            static parse(args: string[], incomplete: boolean): Module | null {
                if(args.length < 1)
                    return new Module("", true);
                let moduleName = args[0];
                if(ErlangUtils.isAtom(moduleName))
                    return new Module(moduleName, incomplete);
                return null;
            }
        }
        export class Compile extends Directive {
            readonly compileTerm: string
            private constructor(compileTerm: string, incomplete = false) {
                super(incomplete);
                this.compileTerm = compileTerm;
            }
            
            static parse(args: string[], incomplete: boolean): Compile | null {
                if(args.length < 1)
                    return new Compile("", true);
                let compileTerm = args[0];
                return new Compile(compileTerm, incomplete);
            }
        }
        export class Export extends Directive {
            readonly functions: {name: string, arity: number}[]
            private constructor(functions: {name: string, arity: number}[], incomplete = false) {
                super(incomplete);
                this.functions = functions;
            }
            
            static parse(args: string[], incomplete: boolean): Export | null {
                if(args.length < 1)
                    return new Export([], incomplete);
                let functions = [];
                for (let i = 0; i < args.length; i++) {
                    let obj = Export.parseExportDefinition(args[i]);
                    if(obj === null)
                        continue;
                    functions.push(obj);
                }
                return new Export(functions, incomplete);
            }

            private static parseExportDefinition(exportDefinition: string): {name: string, arity: number} | null {
                if(!exportDefinition || exportDefinition.length === 0)
                    return null;

                let splitStr = exportDefinition.split("/");
                if(splitStr.length !== 2)
                    return null;

                let functionObj = {
                    name: splitStr[0], 
                    arity: Number.parseInt(splitStr[1])
                };

                if(!ErlangUtils.isAtom(functionObj.name))
                    return null;

                if(functionObj.arity === NaN)
                    return null;

                return functionObj;
            }
        }
        // export class Define extends Directive {
        //     readonly macroName: string
        //     readonly macroValue: string
        //     private constructor(macroName: string, macroValue: string, incomplete = false) {
        //         super(incomplete);
        //         this.macroName = macroName;
        //         this.macroValue = macroValue;
        //     }
            
        //     static parse(args: string[], incomplete: boolean): Compile | null {
        //         if(args.length < 2)
        //             return new Compile("", true);
        //         let compileTerm = args[0];
        //         return new Compile(compileTerm, incomplete);
        //     }
        // }
        export function parseType(str: string): Type {
            switch(str) {
                case "module":
                    return Type.Module;
                case "compile":
                    return Type.Compile;
                case "define":
                    return Type.Define;
                case "undef":
                    return Type.Undefine;
                case "import":
                    return Type.Import;
                case "export":
                    return Type.Export;
                case "record":
                    return Type.Record;
                case "include":
                    return Type.Include;
                case "include_lib":
                    return Type.IncludeLib;
                case "if":
                    return Type.BeginIf;
                case "ifdef":
                    return Type.BeginIfDef;
                case "ifndef":
                    return Type.BeginIfNotDef;
                case "else":
                    return Type.Else;
                case "elif":
                    return Type.ElseIf;
                case "endif":
                    return Type.EndIf;
                case "warning":
                    return Type.CompileWarning;
                case "error":
                    return Type.CompileError;
                default:
                    console.warn("Unknown DirectiveType '%O'", str);
                    return Type.UNKNOWN;
            }
        }
    }
}

class File {
    functionBlocks: {[functionName: string]: Cached<Block>}

    constructor() {
        this.functionBlocks = {};
    }
}

export class ErlangParser {

    connection: _Connection;
    cachedFiles: {[fileName: string]: Cached<File> } = {};

    constructor(connection: _Connection, documents: TextDocuments<TextDocument>) {
        this.connection = connection;

        documents.onDidOpen(this.onDocumentOpen.bind(this));

        documents.onDidClose(this.onDocumentClose.bind(this));

        documents.onDidChangeContent(this.onDocumentChange.bind(this));
    }

    onDocumentOpen(event: TextDocumentChangeEvent<TextDocument>) {
        // console.log("[onDocumentOpen] event: %O", event);
        this.cachedFiles[event.document.uri] = new Cached<File>();
        let blocks = this.parseBlocks(event.document);
        console.log("[onDocumentOpen] Blocks: %O", blocks);
        this.processBlocks(blocks);
    }

    onDocumentClose(event: TextDocumentChangeEvent<TextDocument>) {
        // console.log("[onDocumentClose] event: %O", event);
        delete this.cachedFiles[event.document.uri];
    }

    onDocumentChange(event: TextDocumentChangeEvent<TextDocument>) {
        // console.log("[onDocumentChange] event: %O", event);
        let blocks = this.parseBlocks(event.document);
        console.log("[onDocumentChange] Blocks: %O", blocks);
        this.processBlocks(blocks);
    }

    private parseBlocks(document: TextDocument): Block[] {
        let text = document.getText();
        let lines = text.split("\n");
        let blockAcc: Block[] = [];
        for(let i = 0; i < lines.length; i++) {
            let trimLine = (i: number) => lines[i].trimStart();
            if(trimLine(i) == "")
                continue;
            let symbol = trimLine(i)[0];
            switch(symbol){
                case "%":
                    blockAcc.push(new Block(Block.Type.Comment, lines[i]));
                    break;
                case "-":
                    let directiveAcc = [];
                    let incomplete = false;
                    let line = "";
                    do{
                        line = lines[i++];
                        directiveAcc.push(line);
                        if(i >= lines.length) {
                            incomplete = !line.trimEnd().endsWith(".");
                            break;
                        }
                    } while(!line.trimEnd().endsWith("."));
                    console.log("directiveAcc: %O")
                    let block = this.parseBlocks_Directive(directiveAcc, incomplete);
                    if(block !== null)
                        blockAcc.push(block);
                    break;
                default:
                    console.log("unknown symbol '%O'", symbol);
                    break;
            }
        }
        return blockAcc;
    }

    private parseBlocks_Directive(directiveAcc: string[], incomplete: boolean = false): Block | null {
        console.log();
        console.log("directiveAcc: %O", directiveAcc)
        let whitespaceStripped = directiveAcc.join("").replace(/\s/g, "");
        console.log("whitespaceStripped: %O", whitespaceStripped)
        let identifiedDirective = this.identifyDirective(whitespaceStripped);
        console.log("identifiedDirective: %O", identifiedDirective)
        if(identifiedDirective == null)
            return null;

        let parseDirective: (args: string[], incomplete: boolean) => Block.Directives.Directive | null;
        console.log(`Block.Directives.parseType(%O): %O`, identifiedDirective.keyword, Block.Directives.parseType(identifiedDirective.keyword))
        switch(Block.Directives.parseType(identifiedDirective.keyword)) {
            case Block.Directives.Type.Module:
                parseDirective = Block.Directives.Module.parse;
                break;
            case Block.Directives.Type.Import:
                Util.NOT_IMPLEMENTED();
                // parseDirective = Block.Directives.Import.parse;
                break;
            case Block.Directives.Type.Export:
                parseDirective = Block.Directives.Export.parse;
                break;
            case Block.Directives.Type.Include:
                Util.NOT_IMPLEMENTED();
                // parseDirective = Block.Directives.Include.parse;
                break;
            case Block.Directives.Type.IncludeLib:
                Util.NOT_IMPLEMENTED();
                // parseDirective = Block.Directives.IncludeLib.parse;
                break;
            case Block.Directives.Type.Record:
                Util.NOT_IMPLEMENTED();
                // parseDirective = Block.Directives.Record.parse;
                break;
            case Block.Directives.Type.Define:
                Util.NOT_IMPLEMENTED();
                // parseDirective = Block.Directives.Define.parse;
                break;
            case Block.Directives.Type.Undefine:
                Util.NOT_IMPLEMENTED();
                // parseDirective = Block.Directives.Undefine.parse;
                break;
            case Block.Directives.Type.Compile:
                parseDirective = Block.Directives.Compile.parse;
                break;
            case Block.Directives.Type.BeginIf:
                Util.NOT_IMPLEMENTED();
                // parseDirective = Block.Directives.BeginIf.parse;
                break;
            case Block.Directives.Type.BeginIfDef:
                Util.NOT_IMPLEMENTED();
                // parseDirective = Block.Directives.BeginIfDef.parse;
                break;
            case Block.Directives.Type.BeginIfNotDef:
                Util.NOT_IMPLEMENTED();
                // parseDirective = Block.Directives.BeginIfNotDef.parse;
                break;
            case Block.Directives.Type.Else:
                Util.NOT_IMPLEMENTED();
                // parseDirective = Block.Directives.Else.parse;
                break;
            case Block.Directives.Type.ElseIf:
                Util.NOT_IMPLEMENTED();
                // parseDirective = Block.Directives.ElseIf.parse;
                break;
            case Block.Directives.Type.EndIf:
                Util.NOT_IMPLEMENTED();
                // parseDirective = Block.Directives.EndIf.parse;
                break;
            case Block.Directives.Type.CompileWarning:
                Util.NOT_IMPLEMENTED();
                // parseDirective = Block.Directives.CompileWarning.parse;
                break;
            case Block.Directives.Type.CompileError:
                Util.NOT_IMPLEMENTED();
                // parseDirective = Block.Directives.CompileError.parse;
                break;
            case Block.Directives.Type.UNKNOWN:
                return null;
        }

        let parsedDirective = parseDirective(identifiedDirective.arguments, incomplete);
        console.log("parsedDirective: %O", parsedDirective)
        if(parsedDirective == null)
            return null;
        return new Block(Block.Type.Directive, parseDirective);
    }

    private identifyDirective(str: string): {keyword: string, arguments: string[]} | null {
        /* The below regex matches the following patterns

        * -module(mod).
        |> keyword: module, arguments: mod

        * -compile(debug_info).
        |> keyword: compile, arguments: debug_info

        * -define(X,test).
        |> keyword: define, arguments: X,test

        * -export([func/0,func/1]).
        |> keyword: export, arguments: func/0,func/1

        * -record(test,{a::atom(),b::any(),c::undefined}).
        |> keyword: record, arguments: a::atom(),b::any(),c::undefined

        * -ifdef(X).
        |> keyword: ifdef, arguments: X

        * -endif.
        |> keyword: endif, arguments: 

        * -include("test").
        |> keyword: include, arguments: "test"

        * -include_lib("a/b/c").
        |> keyword: include_lib, arguments: "a/b/c"

        */
        let regex = /-(?<keyword>[a-z_]+)(?:\([\{\[\"]?(?<arguments>.+?)[\"\]\}]?\))?\./
        let matched = regex.exec(str);
        let groups = matched?.groups;
        if(!(groups?.["keyword"] && groups?.["arguments"]))
            return null;

        /* The below regex matches the following patterns

        * "abc",def, ghi, "lmn "
        |> "abc" def ghi "lmn "

        * "abc123", "abc.123,awd:"
        |> "abc123" "abc.123,awd:"

        * abc
        |> abc

        * "abc"
        |> "abc"

        * 123
        |> 123

        * "123"
        |> "123"

        */
        let argMatcher = /("[\w\W]+?"|\w+)/g

        let args = groups?.["arguments"].match(argMatcher);
        if(args === null)
            return null;

        return {
            keyword: groups?.["keyword"],
            arguments: args
        }
    }

    private processBlocks(blocks: Block[]) {

    }
}