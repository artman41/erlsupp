export abstract class Token {
    readonly type: Token.Type;

    constructor(type: Token.Type) {
        this.type = type;
    }
}

export interface IIterableToken {
    [index: number]: Token
}

export namespace Token {
    export enum Type {
        SYMBOL,
        ATOM,
        VARIABLE,
        NUMBER,
    }
}