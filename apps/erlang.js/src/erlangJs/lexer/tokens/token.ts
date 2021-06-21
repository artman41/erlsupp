export abstract class Token {
    readonly type: Token.Type;
    readonly value: any;

    constructor(type: Token.Type, value: any) {
        this.type = type;
        this.value = value;
    }
}

export interface IIterableToken {
    [index: number]: Token
}

export namespace Token {
    export enum Type {
        ATOM,
        KEYWORD,
        VARIABLE,
        INTEGER,
        FLOAT,
        TUPLE,
        LIST,
        SETTER,
        APPEND,
        SUBTRACT,
        ADD,
        MINUS,
        MULTIPLY,
        DIVIDE,
        COMPARE,
        PARENTHESIS,
        FUN,
        DELIMITER,
        BOOLEAN,
        BOOLEAN_OP,
    }
}