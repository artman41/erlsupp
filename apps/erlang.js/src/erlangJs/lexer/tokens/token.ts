import { LinePosition } from "../line_position"

export abstract class Token {
    readonly type: Token.Type;
    readonly value: any;
    public linePos: LinePosition

    constructor(type: Token.Type, linePos?: LinePosition) {
        this.type = type;
        this.linePos = linePos === undefined ? new LinePosition(1, 1) : linePos;
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