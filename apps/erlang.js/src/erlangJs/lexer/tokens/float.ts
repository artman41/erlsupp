import { Token } from "./token";

export class Float implements Token {
    readonly type: Token.Type;
    readonly value: number;

    constructor(value: number) {
        this.type = Token.Type.FLOAT;
        this.value = value;
    }
    
    static isFloat(float: number): boolean {
        // stolen from https://locutus.io/php/var/is_float/
        return +float === float && (!Number.isFinite(float) || !!(float % 1))
    }
}