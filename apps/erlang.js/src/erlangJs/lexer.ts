import { 
    Token,
    Atom,
    Variable,
    Float,
    Integer,
    Tuple,
    List,
} from "./lexer/tokens";

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
        "'":  39, '"':  34,
        "_":  95
    };

    tokenise(str: string, acc: Token[] = []): Token[] {
        if(str.length === 0)
            return acc;
        let token: Token | null = null;
        let i = 0;
        do {
            let charCode = str.charCodeAt(i);
            switch(charCode) {
                case NaN:
                    return acc;
                case this.charCodes["\s"]:
                case this.charCodes["\t"]:
                case this.charCodes["\n"]:
                    i++;
                    continue;
                case this.charCodes["'"]:
                    [token, str] = this.tokeniseAtom(str, i, true);
                    break;
                case this.charCodes["_"]:
                    [token, str] = this.tokeniseVariable(str, i);
                    break;
                case this.charCodes["{"]:
                    [token, str] = this.tokeniseTuple(str, i);
                    break;
                case this.charCodes["["]:
                    [token, str] = this.tokeniseList(str, i);
                    break;
                default:
                    if(this.charCodes["a"] <= charCode && charCode <= this.charCodes["z"])
                        [token, str] = this.tokeniseAtom(str, i);
                    else if(this.charCodes["A"] <= charCode && charCode <= this.charCodes["Z"])
                        [token, str] = this.tokeniseVariable(str, i);
                    else if(this.charCodes["0"] <= charCode && charCode <= this.charCodes["9"])
                        [token, str] = this.tokeniseNumber(str, i);
                    else
                        throw new Error("shouldn't be here");
                    break;
            }
        } while(token === null);
        if(token !== null)
            acc.push(token);
        return str.length === 0 ? acc : this.tokenise(str, acc);
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

        let remainderStr = str.substr(index+1);

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

        let remainderStr = str.substr(index+1);

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

        let remainderStr = str.substr(index+1);

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

    private tokeniseTuple(str: string, index: number = 0): [Tuple | null, string] {
        let value = "";
        let tupleClosed = false;
        if(str.length === 0)
            return [null, str];

        if(index++ === 0) {
            let tupleOpening = str[0] === "{"
            if(!tupleOpening)
                return [null, str];
        }
        
        for (; index < str.length; index++) {
            const char = str[index];
            if(char === "}"){
                if(str[index+1] === "}"){
                    value += char;
                    continue;
                }
                tupleClosed = true;
                break;
            } else
                value += char;
        }

        let remainderStr = str.substr(index+1);

        if(!tupleClosed)
            return [null, remainderStr];
        
            let tokenised = this.tokenise(value);
            return [new Tuple(...tokenised), remainderStr];
    }

    private tokeniseList(str: string, index: number = 0): [List | null, string] {
        let value = "";
        let listClosed = false;
        if(str.length === 0)
            return [null, str];

        if(index++ === 0) {
            let tupleOpening = str[0] === "["
            if(!tupleOpening) {
                console.log(`char '${str[0]}' is not a valid starting char for Tuple`);
                return [null, str];
            }
        }

        console.log("got to for loop");
        for (; index < str.length; index++) {
            const char = str[index];
            if(char === "]"){
                if(str[index+1] === "]"){
                    value += char;
                    continue;
                }
                listClosed = true;
                break;
            } else
                value += char;
        }

        console.log("value: %O", value);

        let remainderStr = str.substr(index+1);

        if(!listClosed)
            return [null, remainderStr];
        
            let tokenised = this.tokenise(value);
            return [new List(...tokenised), remainderStr];
    }
}