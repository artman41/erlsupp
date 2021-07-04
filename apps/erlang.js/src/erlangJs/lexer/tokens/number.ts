import { LinePosition } from "../line_position";
import { Token } from "../tokens";

export class Number extends Token {
    readonly value: number;

    constructor(value: number, linePos?: LinePosition) {
        super(Token.Type.NUMBER, linePos);
        this.value = value;
    }
}