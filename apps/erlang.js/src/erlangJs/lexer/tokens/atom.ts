import { Token } from "./token";

export class Atom implements Token {
    readonly type: Token.Type;
    readonly value: string;

    constructor(value: string) {
        this.type = Token.Type.ATOM;
        this.value = value;
    }
    
    static isAtom(str: string): boolean {
        let regex = /^(?:([a-z][a-zA-Z_0-9]+)|'(.+?)')$/

        return regex.test(str);
    }
}