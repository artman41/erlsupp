import * as _ from "lodash";
import { Ok } from "./util/ok"
import { NewError } from "./util/error"
import { 
    Token,
    Symbol,
    Atom,
    Variable,
    Number
} from "./lexer/tokens";

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
    
    tokeniseSingle(str: string): Ok<[Token, string]> | Error {
        return Lexer.StageOne.tokeniseSingle(str);
    }
}

export namespace Lexer {
    export class StageOne {
        static tokenise(str: string): Ok<Token[]> | Error {
            let acc = [];
            
            while(str.length > 0) {
                let ret = StageOne.tokeniseSingle(str)
                if (ret instanceof Error) {
                    if(ret.name === Lexer.errors.stringEmpty)
                        break
                    return ret;
                }
                let [token, str2] = ret.value
                if (str === str2) {
                    throw new Error("String didn't change!")
                }
                str = str2;
                acc.push(token)
            }
            return new Ok(acc)
        }

        static tokeniseSingle(str: string): Ok<[Token, string]> | Error {
            let token: Token | null = null;
            let i = 0;
            do {
                if (str.length === 0 || str.length <= i)
                    return NewError(Lexer.errors.stringEmpty)
                let char = str[i];
                switch(char) {
                    case " ":
                    case "\t":
                    case "\n":
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
                        [token, i] = ret.value
                        break;
                    default:
                        if(char == "'" || ("a" <= char && char <= "z")) {
                            let ret = StageOne.tokeniseAtom(str, i)
                            if(ret instanceof Error) {
                                return ret
                            }
                            [token, i] = ret.value
                        }
                        else if(char == "_" || ("A" <= char && char <= "Z")) {
                            let ret = StageOne.tokeniseVariable(str, i)
                            if(ret instanceof Error) {
                                return ret
                            }
                            [token, i] = ret.value
                        }
                        else if("0" <= char && char <= "9") {
                            let ret = StageOne.tokeniseNumber(str, i)
                            if(ret instanceof Error) {
                                return ret
                            }
                            [token, i] = ret.value
                        }
                        else {
                            return NewError(Lexer.errors.unhandledChar, `Unhandled char '${char}' (CharCode ${char?.charCodeAt(0)})`);
                        }
                }
            } while(token === null);
            return new Ok([token, str.substr(i)])
        }

        private static tokeniseSymbol(str: string, index: number): Ok<[Symbol, number]> | Error {
            if(str.length === 0)
                return NewError(Lexer.errors.stringEmpty)
                
            const char1 = str[index++];
            const index1 = index;

            const char2 = str[index++];
            const index2 = index;

            const char3 = str[index++];
            const index3 = index;

            let ret: Ok<[Symbol, number]> | Error
            
            switch(char1 + char2 + char3) {
                // boolean
                case "=:=":
                    ret = new Ok([new Symbol("=:="), index3])
                    break
                case "=/=":
                    ret = new Ok([new Symbol("=/="), index3])
                    break
                default:
                    switch(char1 + char2) {
                        // list
                        case "++":
                            ret = new Ok([new Symbol("++"), index2])
                            break
                        case "--":
                            ret = new Ok([new Symbol("--"), index2])
                            break
                        // boolean
                        case "==":
                            ret = new Ok([new Symbol("=="), index2])
                            break
                        case "/=":
                            ret = new Ok([new Symbol("/="), index2])
                            break
                        case "=<":
                            ret = new Ok([new Symbol("=<"), index2])
                            break
                        case ">=":
                            ret = new Ok([new Symbol(">="), index2])
                            break
                        // map
                        case "=>":
                            ret = new Ok([new Symbol("=>"), index2])
                            break
                        // spec
                        case "::":
                            ret = new Ok([new Symbol("::"), index2])
                            break
                        // function
                        case "->":
                            ret = new Ok([new Symbol("->"), index2])
                            break
                        default:
                            switch(char1) {
                                // Arithmetic
                                case "+":
                                    ret = new Ok([new Symbol("+"), index1])
                                    break
                                case "-":
                                    ret = new Ok([new Symbol("-"), index1])
                                    break
                                case "*":
                                    ret = new Ok([new Symbol("*"), index1])
                                    break
                                case "/":
                                    ret = new Ok([new Symbol("/"), index1])
                                    break
                                // boolean
                                case "<":
                                    ret = new Ok([new Symbol("<"), index1])
                                    break
                                case ">":
                                    ret = new Ok([new Symbol(">"), index1])
                                    break
                                // container
                                case "(":
                                    ret = new Ok([new Symbol("("), index1])
                                    break
                                case ")":
                                    ret = new Ok([new Symbol(")"), index1])
                                    break
                                case "[":
                                    ret = new Ok([new Symbol("["), index1])
                                    break
                                case "]":
                                    ret = new Ok([new Symbol("]"), index1])
                                    break
                                case "{":
                                    ret = new Ok([new Symbol("{"), index1])
                                    break
                                case "}":
                                    ret = new Ok([new Symbol("}"), index1])
                                    break
                                // misc
                                case "=":
                                    ret = new Ok([new Symbol("="), index1])
                                    break
                                case ",":
                                    ret = new Ok([new Symbol(","), index1])
                                    break
                                case ".":
                                    ret = new Ok([new Symbol("."), index1])
                                    break
                                case ";":
                                    ret = new Ok([new Symbol(";"), index1])
                                    break
                                case "#":
                                    ret = new Ok([new Symbol("#"), index1])
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

        private static tokeniseAtom(str: string, index: number, wrapped: boolean = false): Ok<[Atom, number]> | Error {
            let value = "";
            let wrappedShouldReturn = false;

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
                return new Ok([new Atom(value), index])
            else
                return NewError(Lexer.errors.noClosingChar);
        }

        private static tokeniseVariable(str: string, index: number = 0): Ok<[Variable, number]> | Error {
            let value = "";
            
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

            return new Ok([new Variable(value), index]);
        }

        private static tokeniseNumber(str: string, index: number = 0): Ok<[Number, number]> | Error {
            let value = "";
            
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

            return new Ok([new Number(parseInt(value)), index]);
        }
    }
}