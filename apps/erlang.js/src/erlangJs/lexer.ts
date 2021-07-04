import * as _ from "lodash";
import { Ok } from "./util/ok"
import { NewError, NotImplemented } from "./util/error"
import { LinePosition } from "./lexer/line_position"
import { 
    Token,
    Symbol,
    Atom,
    Variable,
    Number
} from "./lexer/tokens";
import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from "constants";

export class Lexer {
    static readonly charCodes = {
        "\t":  9,
        "\n": 10,
        " ": 32,
        "a":  97, "A":  65,
        "z": 122, "Z":  90,
        "0":  48, '9':  57,
        ",":  44, ".":  46,
        ";":  59, ":":  58,
        "<":  60, ">":  62,
        "(":  40, ")":  41,
        "[":  91, "]":  93,
        "{": 123, "}": 125,
        "-":  45, "+":  43,
        "_":  95, "=":  61,
        "'":  39, '"':  34,
        "*":  42,  "/": 47,
    };

    static readonly errors = {
        stringEmpty: "String is Empty",
        unhandledChar: "Unhandled Char",
        invalidStartingChar: "Invalid starting Char",
        noClosingChar: "Failed to find closing Char"
    }
    
    tokenise(str: string): Ok<Token[]> | Error {
        return Lexer.StageOne.tokenise(str);
    }
    
    tokeniseSingle(str: string, linePos?: LinePosition): Ok<[Token, number, LinePosition]> | Error {
        return Lexer.StageOne.tokeniseSingle(str, linePos);
    }
}

export namespace Lexer {
    export class StageOne {
        // tokenise returns either Ok<Token[]> or an Error for a given string.
        static tokenise(str: string): Ok<Token[]> | Error {
            let acc = [];
            let linePos: LinePosition | undefined = undefined
            let token: Token
            let index: number
            while(str.length > 0) {
                let ret = StageOne.tokeniseSingle(str, linePos)
                if (ret instanceof Error) {
                    if(ret.name === Lexer.errors.stringEmpty)
                        break
                    return ret;
                }
                [token, index, linePos] = ret.value
                let str2 = str.substr(index)
                if (str === str2) {
                    throw new Error("String didn't change!")
                }
                str = str2;
                acc.push(token)
            }
            return new Ok(acc)
        }

        // tokeniseSingle returns either Ok<[Token, lastIndex, lastLinePosition]> or an Error.
        static tokeniseSingle(str: string, linePos?: LinePosition): Ok<[Token, number, LinePosition]> | Error {
            let token: Token | null = null;
            let i = 0;
            let line = 1;
            let column = 1;
            if(linePos !== undefined) {
                line = linePos.line
                column = linePos.column
            }
            do {
                if (str.length === 0 || str.length <= i)
                    return NewError(Lexer.errors.stringEmpty)
                const linePos = new LinePosition(line, column);
                const char = str[i];
                let columnIncrement: number
                switch(char) {
                    case "\n":
                        line++;
                        column = 1;
                        i++;
                        continue;
                    case " ":
                    case "\t":
                        column++
                        i++;
                        continue;
                    case "#":
                    case ";":
                    case ",":
                    case ".":
                    case ":":
                    case ":":
                    case "=":
                    case "-":
                    case "+":
                    case "/":
                    case "*":
                    case "[":
                    case "{":
                    case "(":
                    case "]":
                    case "}":
                    case ")":
                        let ret = StageOne.tokeniseSymbol(str, i)
                        if(ret instanceof Error)
                            return ret;
                        [token, i, columnIncrement] = ret.value
                        token.linePos = linePos
                        column += columnIncrement
                        break;
                    default:
                        if(char == "'" || ("a" <= char && char <= "z")) {
                            let ret = StageOne.tokeniseAtom(str, i)
                            if(ret instanceof Error) {
                                return ret
                            }
                            [token, i, columnIncrement] = ret.value
                            token.linePos = linePos
                            column += columnIncrement
                        }
                        else if(char == "_" || ("A" <= char && char <= "Z")) {
                            let ret = StageOne.tokeniseVariable(str, i)
                            if(ret instanceof Error) {
                                return ret
                            }
                            [token, i, columnIncrement] = ret.value
                            token.linePos = linePos
                            column += columnIncrement
                        }
                        else if("0" <= char && char <= "9") {
                            let ret = StageOne.tokeniseNumber(str, i)
                            if(ret instanceof Error) {
                                return ret
                            }
                            [token, i, columnIncrement] = ret.value
                            token.linePos = linePos
                            column += columnIncrement
                        }
                        else {
                            return NewError(Lexer.errors.unhandledChar, `Unhandled char '${char}' (CharCode ${char?.charCodeAt(0)})`);
                        }
                }
            } while(token === null);
            return new Ok([token, i, new LinePosition(line, column)])
        }

        private static tokeniseSymbol(str: string, index: number): Ok<[Symbol, number, number]> | Error {
            if(str.length === 0)
                return NewError(Lexer.errors.stringEmpty)
            
            let indexBefore = index;

            const char1 = str[index++];
            const index1 = index;

            const char2 = str[index++];
            const index2 = index;

            const char3 = str[index++];
            const index3 = index;

            let ret: Ok<[Symbol, number, number]> | Error
            
            switch(char1 + char2 + char3) {
                // boolean
                case "=:=":
                    ret = new Ok([new Symbol("=:="), index, index - indexBefore])
                    break
                case "=/=":
                    ret = new Ok([new Symbol("=/="), index, index - indexBefore])
                    break
                default:
                    index = index2
                    switch(char1 + char2) {
                        // list
                        case "++":
                            ret = new Ok([new Symbol("++"), index, index - indexBefore])
                            break
                        case "--":
                            ret = new Ok([new Symbol("--"), index, index - indexBefore])
                            break
                        // boolean
                        case "==":
                            ret = new Ok([new Symbol("=="), index, index - indexBefore])
                            break
                        case "/=":
                            ret = new Ok([new Symbol("/="), index, index - indexBefore])
                            break
                        case "=<":
                            ret = new Ok([new Symbol("=<"), index, index - indexBefore])
                            break
                        case ">=":
                            ret = new Ok([new Symbol(">="), index, index - indexBefore])
                            break
                        // map
                        case "=>":
                            ret = new Ok([new Symbol("=>"), index, index - indexBefore])
                            break
                        // spec
                        case "::":
                            ret = new Ok([new Symbol("::"), index, index - indexBefore])
                            break
                        // function
                        case "->":
                            ret = new Ok([new Symbol("->"), index, index - indexBefore])
                            break
                        default:
                            index = index1
                            switch(char1) {
                                // Arithmetic
                                case "+":
                                    ret = new Ok([new Symbol("+"), index, index - indexBefore])
                                    break
                                case "-":
                                    ret = new Ok([new Symbol("-"), index, index - indexBefore])
                                    break
                                case "*":
                                    ret = new Ok([new Symbol("*"), index, index - indexBefore])
                                    break
                                case "/":
                                    ret = new Ok([new Symbol("/"), index, index - indexBefore])
                                    break
                                // boolean
                                case "<":
                                    ret = new Ok([new Symbol("<"), index, index - indexBefore])
                                    break
                                case ">":
                                    ret = new Ok([new Symbol(">"), index, index - indexBefore])
                                    break
                                // container
                                case "(":
                                    ret = new Ok([new Symbol("("), index, index - indexBefore])
                                    break
                                case ")":
                                    ret = new Ok([new Symbol(")"), index, index - indexBefore])
                                    break
                                case "[":
                                    ret = new Ok([new Symbol("["), index, index - indexBefore])
                                    break
                                case "]":
                                    ret = new Ok([new Symbol("]"), index, index - indexBefore])
                                    break
                                case "{":
                                    ret = new Ok([new Symbol("{"), index, index - indexBefore])
                                    break
                                case "}":
                                    ret = new Ok([new Symbol("}"), index, index - indexBefore])
                                    break
                                // misc
                                case "=":
                                    ret = new Ok([new Symbol("="), index, index - indexBefore])
                                    break
                                case ",":
                                    ret = new Ok([new Symbol(","), index, index - indexBefore])
                                    break
                                case ".":
                                    ret = new Ok([new Symbol("."), index, index - indexBefore])
                                    break
                                case ";":
                                    ret = new Ok([new Symbol(";"), index, index - indexBefore])
                                    break
                                case "#":
                                    ret = new Ok([new Symbol("#"), index, index - indexBefore])
                                    break
                                default:
                                    ret = NewError(Lexer.errors.unhandledChar, `Invalid Starting Char '${char1}' (CharCode ${char1?.charCodeAt(0)})`)
                                    break
                            }
                    }
                    break
            }
            return ret;
        }

        private static tokeniseAtom(str: string, index: number, wrapped: boolean = false): Ok<[Atom, number, number]> | Error {
            let value = "";
            let wrappedShouldReturn = false;
            let indexBefore = index;

            if(str.length === 0)
                return NewError(Lexer.errors.stringEmpty)

            if(index === 0) {
                const char = str[0];
                let between_az = "a" <= char && char <= "z";
                let isLongAtom = char === "'";
                wrapped = isLongAtom;
                if(!(between_az || isLongAtom))
                    return NewError(Lexer.errors.invalidStartingChar, `Invalid Starting Char '${char}' (CharCode ${char?.charCodeAt(0)})`);
            }

            for (; index < str.length; index++) {
                const char = str[index];
                if(char === "'")
                    if(wrapped && !wrappedShouldReturn){
                        wrappedShouldReturn = true;
                        continue;
                    } else {
                        index++;
                        break;
                    }
                else if(wrapped)
                    value += str[index];
                else if(char === "_")
                    value += str[index];
                else if("a" <= char && char <= "z")
                    value += str[index];
                else if("A" <= char && char <= "Z")
                    value += str[index];
                else if("0" <= char && char <= "9")
                    value += str[index];
                else {
                    if(wrapped)
                        index++;
                    break;
                }
            }
            if(!wrapped || (wrapped && wrappedShouldReturn)) 
                return new Ok([new Atom(value), index, index-indexBefore])
            else
                return NewError(Lexer.errors.noClosingChar);
        }

        private static tokeniseVariable(str: string, index: number = 0): Ok<[Variable, number, number]> | Error {
            let value = "";
            let indexBefore = index;
            
            if(str.length === 0)
                return NewError(Lexer.errors.stringEmpty);

            if(index === 0) {
                const char = str[0];
                let between_AZ = "A" <= char && char <= "Z";
                let isIgnoredVariable = str[index] === "_";
                if(!(between_AZ || isIgnoredVariable))
                    return NewError(Lexer.errors.invalidStartingChar, `Invalid Starting Char '${char}' (CharCode ${char?.charCodeAt(0)})`);
            }
            
            for (; index < str.length; index++) {
                const char = str[index];
                if(char === "_")
                    value += str[index];
                else if("a" <= char && char <= "z")
                    value += str[index];
                else if("A" <= char && char <= "Z")
                    value += str[index];
                else if("0" <= char && char <= "9")
                    value += str[index];
                else
                    break;
            }

            return new Ok([new Variable(value), index, index-indexBefore]);
        }

        private static tokeniseNumber(str: string, index: number = 0): Ok<[Number, number, number]> | Error {
            let value = "";
            let indexBefore = index;
            
            if(str.length === 0)
                return NewError(Lexer.errors.stringEmpty);

            if(index === 0) {
                const char = str[0];
                if(!("0" <= char && char <= "9"))
                    return NewError(Lexer.errors.invalidStartingChar, `Invalid Starting Char '${char}' (CharCode ${char?.charCodeAt(0)})`);
            }
            
            for (; index < str.length; index++) {
                const char = str[index];
                if("0" <= char && char <= "9")
                    value += char;
                else {
                    break;
                }
            }

            return new Ok([new Number(parseInt(value)), index, index-indexBefore]);
        }
    }

    export class StageTwo {
        parse(tokens: Token[]): Ok<void> | Error {
            return NotImplemented();
        }
    }
}