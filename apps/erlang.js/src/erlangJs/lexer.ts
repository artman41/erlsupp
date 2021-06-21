import * as _ from "lodash";
import { 
    Token,
    Atom,
    Keyword,
    Variable,
    Float,
    Integer,
    Tuple,
    List,
    Setter,
    Append,
    Subtract,
    Add,
    Minus,
    Compare,
    Parenthesis,
    Fun,
    Boolean,
    Multiply,
    Divide,
    BooleanOp
} from "./lexer/tokens";
import { Delimiter } from "./lexer/tokens/delimiter";

export class Lexer {
    private readonly charCodes = {
        "\t":  9,
        "\n": 10,
        "\s": 32,
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
    
    tokenise(str: string, acc: Token[] = [], returnPredicate?: (token: Token) => boolean | undefined): [Token[], string | null] {
        if(str.length === 0)
            return [acc, null];
        let token: Token | null = null;
        let i = 0;
        do {
            const charCode = str.charCodeAt(i);
            switch(charCode) {
                case this.charCodes["\s"]:
                case this.charCodes["\t"]:
                case this.charCodes["\n"]:
                    i++;
                    continue;
                case this.charCodes[";"]:
                case this.charCodes[","]:
                case this.charCodes["."]:
                case this.charCodes[":"]:
                    [token, str] = this.tokeniseDelimiter(str, i);
                    break;
                case this.charCodes["'"]:
                    [token, str] = this.tokeniseAtom(str, i, true);
                    if (token !== null) {
                        let [parsedToken, remainderStr] = this.tryParseAtom(token, str, acc);
                        if(parsedToken !== null) {
                            token = parsedToken;
                            str = remainderStr;
                        }
                    }
                    break;
                case this.charCodes["_"]:
                    [token, str] = this.tokeniseVariable(str, i);
                    break;
                case this.charCodes["{"]:
                    [token, str] = this.tokeniseIterable(str, "{", "}", Tuple, i);
                    break;
                case this.charCodes["["]:
                    [token, str] = this.tokeniseIterable(str, "[", "]", List, i);
                    break;
                case this.charCodes["("]:
                    [token, str] = this.tokeniseIterable(str, "(", ")", Parenthesis, i);
                    break;
                case this.charCodes["="]:
                case this.charCodes["-"]:
                case this.charCodes["+"]:
                case this.charCodes["/"]:
                case this.charCodes["*"]:
                    return [this.tokeniseOperator(str, i, acc), null]
                default:
                    if(this.charCodes["a"] <= charCode && charCode <= this.charCodes["z"]) {
                        [token, str] = this.tokeniseAtom(str, i);
                        if (token !== null) {
                            let [parsedToken, remainderStr] = this.tryParseAtom(token, str, acc);
                            if(parsedToken !== null) {
                                token = parsedToken;
                                str = remainderStr;
                            }
                        }
                    } else if(this.charCodes["A"] <= charCode && charCode <= this.charCodes["Z"])
                        [token, str] = this.tokeniseVariable(str, i);
                    else if(this.charCodes["0"] <= charCode && charCode <= this.charCodes["9"])
                        [token, str] = this.tokeniseNumber(str, i);
                    else if(Number.isNaN(charCode))
                        return [acc, null];
                    else
                        throw new Error(`Unhandled CharCode '${charCode}'`);
            }
        } while(token === null);
        if(token !== null)
            acc.push(token);
        if(returnPredicate !== undefined && returnPredicate(token))
            return [acc, str];
        return str.length === 0 ? [acc, null] : this.tokenise(str, acc, returnPredicate);
    }

    tokeniseSingle(str: string, acc: Token[]): [Token[], string | null] {
        return this.tokenise(str, acc, (_) => true);
    }

    private tokeniseAtom(str: string, index: number = 0, wrapped: boolean = false): [Atom | null, string] {
        let value = "";
        let wrappedShouldReturn = false;
        
        if(str.length === 0)
            return [null, str];

        if(index === 0) {
            let charCode = str.charCodeAt(0);
            let between_az = this.charCodes["a"] <= charCode && charCode <= this.charCodes["z"];
            let isLongAtom = str[index] === "'";
            wrapped = isLongAtom;
            if(!(between_az || isLongAtom))
                return [null, str];
        }

        for (; index < str.length; index++) {
            const char = str[index];
            const charCode = str.charCodeAt(index);
            if(char === "'")
                if(wrapped && !wrappedShouldReturn){
                    wrappedShouldReturn = true;
                    continue;
                } else
                    break;
            else if(char === "_")
                value += str[index];
            else if(this.charCodes["a"] <= charCode && charCode <= this.charCodes["z"])
                value += str[index];
            else if(this.charCodes["A"] <= charCode && charCode <= this.charCodes["Z"])
                value += str[index];
            else if(this.charCodes["0"] <= charCode && charCode <= this.charCodes["9"])
                value += str[index];
            else
                if(wrapped)
                    value += str[index];
                else
                    break;
        }

        let remainderStr = str.substr(index + (wrapped ? 1 : 0));

        if(!wrapped || (wrapped && wrappedShouldReturn)) 
            return [new Atom(value), remainderStr]
        else
            return [null, remainderStr];
    }

    private tokeniseVariable(str: string, index: number = 0): [Variable | null, string] {
        let value = "";
        
        if(str.length === 0)
            return [null, str];

        if(index === 0) {
            let charCode = str.charCodeAt(0);
            let between_AZ = this.charCodes["A"] <= charCode && charCode <= this.charCodes["Z"];
            let isIgnoredVariable = str[index] === "_";
            if(!(between_AZ || isIgnoredVariable))
                return [null, str];
        }
        
        for (; index < str.length; index++) {
            const char = str[index];
            const charCode = str.charCodeAt(index);
            if(char === "_")
                value += str[index];
            else if(this.charCodes["a"] <= charCode && charCode <= this.charCodes["z"])
                value += str[index];
            else if(this.charCodes["A"] <= charCode && charCode <= this.charCodes["Z"])
                value += str[index];
            else if(this.charCodes["0"] <= charCode && charCode <= this.charCodes["9"])
                value += str[index];
            else
                break;
        }

        let remainderStr = str.substr(index);

        return [new Variable(value), remainderStr];
    }

    private tokeniseNumber(str: string, index: number = 0): [Float | Integer | null, string] {
        let value = "";
        let isFloat = false;

        if(str.length === 0)
            return [null, str];

        if(index === 0) {
            let charCode = str.charCodeAt(0);
            let between_09 = this.charCodes["0"] <= charCode && charCode <= this.charCodes["9"];
            if(!between_09)
                return [null, str];
        }

        for (; index < str.length; index++) {
            const char = str[index];
            const charCode = str.charCodeAt(index);
            if(!isFloat && char === ".") {
                isFloat = true;
                value += str[index];
            } else if(this.charCodes["0"] <= charCode && charCode <= this.charCodes["9"])
                value += str[index];
            else
                break;
        }

        let remainderStr = str.substr(index);

        if(isFloat && value.endsWith("."))
            return [null, remainderStr];
        else
            if(isFloat) {
                let fVal = Number.parseFloat(value);
                return [fVal !== NaN ? new Float(fVal) : null, remainderStr];
            } else {
                let iVal = Number.parseInt(value);
                return [iVal !== NaN ? new Integer(iVal) : null, remainderStr];
            }
    }

    private tokeniseIterable<T>(str: string, openChar: string, closeChar: string, instantiator: new (...args: Token[]) => T, index: number = 0): [T | null, string] {

        let value = "";
        let iterableClosed = false;
        if(str.length === 0)
            return [null, str];

        if(index++ === 0) {
            if(str[0] !== openChar)
                return [null, str];
        }
        
        for (; index < str.length; index++) {
            const char = str[index];
            if(char === closeChar){
                if(str[index+1] === closeChar){
                    value += char;
                    continue;
                }
                iterableClosed = true;
                break;
            } else
                value += char;
        }

        let remainderStr = str.substr(index+1);

        if(!iterableClosed)
            return [null, remainderStr];
        
            let [tokenised, _rest] = this.tokenise(value);
            let tokens: Token[] = [];
            const commaDelimiter = new Delimiter(",");
            for (let i = 0; i < tokenised.length; i++) {
                const token = tokenised[i];
                if((i % 2) === 1 && !_.isEqual(token, commaDelimiter))
                    return [null, remainderStr];
                if((i % 2) === 0)
                    tokens.push(token);
            }
            return [new instantiator(...tokens), remainderStr];
    }

    private tokeniseOperator(str: string, index: number, acc: Token[]): Token[] {
        let instantiator: new (left: Token | null, right: Token | null, options?: any) => Token;
        let options: any;
        if(str[index] === "=" && str[index+1] === "=") {
            instantiator = Compare;
            options = {exact: false, not: false}
            index+=1;
        }
        else if(str[index] === "/" && str[index+1] === "=") {
            instantiator = Compare;
            options = {exact: false, not: true}
            index+=1;
        }
        else if(str[index] === "=" && str[index+1] === ":" && str[index+2] === "=") {
            instantiator = Compare;
            options = {exact: true, not: false}
            index+=2;
        }
        else if(str[index] === "=" && str[index+1] === "/" && str[index+2] === "=") {
            instantiator = Compare;
            options = {exact: true, not: true}
            index+=2;
        }
        else if(str[index] === "+" && str[index+1] === "+") {
            instantiator = Append;
            index+=1;
        }
        else if(str[index] === "-" && str[index+1] === "-") {
            instantiator = Subtract;
            index+=1;
        }
        else if(str[index] === "-" && str[index+1] === ">") {
            index+=1;
            let remainderStr = str.substr(index+1);
            if(acc[acc.length-1].type === Token.Type.PARENTHESIS && (acc[acc.length-2].type === Token.Type.ATOM || acc[acc.length-2].type === Token.Type.KEYWORD)) {
                let args: Parenthesis;
                let funcName: Atom;
                let tmp;

                tmp = acc.pop();
                if(tmp !== undefined)
                    args = tmp;
                else {
                    let [tokens, _] = this.tokenise(remainderStr, acc);
                    return tokens;
                }

                tmp = acc.pop();
                if(tmp !== undefined)
                    funcName = tmp;
                else {
                    let [tokens, _] = this.tokenise(remainderStr, acc);
                    return tokens;
                }

                let token: Token | null;
                [token, str] = this.tokeniseFunction(remainderStr, index, funcName, args);
                if(token !== null)
                    acc.push(token);
                let [tokens, _] = this.tokenise(str, acc);
                return tokens;
            }
            let [tokens, _] = this.tokenise(str, acc);
            return tokens;
        }
        else if(str[index] === "=")
            instantiator = Setter;
        else if(str[index] === "+")
            instantiator = Add;
        else if(str[index] === "-")
            instantiator = Minus;
        else if(str[index] === "*")
            instantiator = Multiply;
        else if(str[index] === "/")
            instantiator = Divide;
        else throw new Error("Unknown Operator");

        let remainderStr = str.substr(index + 1);

        let [restTokens, _] = this.tokenise(remainderStr);
        let left = acc.pop();
        let right = restTokens.shift();
        let token = new instantiator(left === undefined ? null : left, right === undefined ? null : right, options);
        acc.push(token);
        return acc.concat(restTokens);
    }

    private tokeniseFunction(str: string, index: number, funcName: Atom, args: Parenthesis): [Fun | null, string] {
        let isAnonymous = funcName.type === Token.Type.KEYWORD && funcName.value === "fun";
        let tailTokens: Token[], remainderStr: string | null;
        
        const caseDelimiterToken = new Delimiter(";");

        let predicateToken: Token = isAnonymous ? Keyword.parse(new Atom("end")) : new Delimiter(".");
        let predicate = (token: Token) => _.isEqual(token, predicateToken) || _.isEqual(token, caseDelimiterToken);

        [tailTokens, remainderStr] = this.tokenise(str, [], predicate);

        let endToken = tailTokens.pop();
        if(endToken === undefined)
            return [null, remainderStr === null ? "" : remainderStr];

        let caseAcc = [
            new Fun.Case(args, ...tailTokens)
        ];

        if(_.isEqual(endToken, caseDelimiterToken)) {
            do {
                if(remainderStr === null)
                    break;
                let [[token], str] = this.tokenise(remainderStr, [], (token) => token.type === Token.Type.PARENTHESIS);
                if(str === null) {
                    caseAcc.push(new Fun.Case(token as Parenthesis));
                    break;
                }
                let indexOfPointer = str.indexOf("->");
                let afterPointer = str.substr(indexOfPointer+2);
                [tailTokens, remainderStr] = this.tokenise(afterPointer, [], predicate);
                endToken = tailTokens.pop();
                if(endToken === undefined)
                    return [null, remainderStr === null ? "" : remainderStr];
                caseAcc.push(new Fun.Case(token as Parenthesis, ...tailTokens));
            } while(!_.isEqual(endToken, predicateToken))
        }

        let fun = new Fun(funcName, [], caseAcc, isAnonymous)

        return [fun, remainderStr === null ? "" : remainderStr];
    }

    tokeniseDelimiter(str: string, index: number): [Delimiter | null, string] {
        let strTail = str.substr(1);
        if(strTail === undefined)
            strTail = "";
        switch(str[index]) {
            case ",":
                return [new Delimiter(","), strTail];
            case ".":
                return [new Delimiter("."), strTail];
            case ";":
                return [new Delimiter(";"), strTail];
            case ":":
                return [new Delimiter(":"), strTail];
            default:
                return [null, strTail]
        }
    }

    tryParseAtom(token: Atom, str: string, acc: Token[]): [Token | null, string] {
        let keyword = Keyword.tryParse(token);
        if(keyword === null)
            return [token, str];
        let boolean = Boolean.tryParse(keyword)
        if(boolean !== null)
            return [boolean, str];
        let prevToken = acc.pop();
        let [[nextToken], remainderStr] = this.tokeniseSingle(str, []);
        let booleanOp = BooleanOp.tryParse(keyword, prevToken === undefined ? null : prevToken, nextToken);
        if(booleanOp !== null)
            return [booleanOp, remainderStr === null ? "" : remainderStr];

        // Need to put the token back in the acc
        if(prevToken !== undefined)
            acc.push(prevToken);
        return [keyword, str];
    }
}