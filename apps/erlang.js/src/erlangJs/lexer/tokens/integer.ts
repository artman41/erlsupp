import { Token } from "./token";

export class Integer implements Token {
    readonly type: Token.Type;
    readonly value: number;

    constructor(value: number) {
        this.type = Token.Type.INTEGER;
        this.value = value;
    }
    
    static isInteger(int: number): boolean {
        return Number.isInteger(int);
    }
}