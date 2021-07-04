import { LinePosition } from "../line_position";
import { Token } from "../tokens";

export class Symbol extends Token {
    readonly value: string;

    constructor(value: string, linePos?: LinePosition) {
        super(Token.Type.SYMBOL, linePos)
        this.value = value;
    }
}