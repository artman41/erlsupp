import { Token } from "./token";

export class Variable implements Token {
    readonly type: Token.Type;
    readonly value: string;

    constructor(value: string) {
        this.type = Token.Type.VARIABLE;
        this.value = value;
    }
    
    static isVariable(str: string): boolean {
        let regex = /^[A-Z_][a-zA-Z_0-9]+$/

        return regex.test(str);
    }
}