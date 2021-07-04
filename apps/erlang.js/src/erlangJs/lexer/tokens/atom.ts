import { LinePosition } from "../line_position";
import { Token } from "../tokens";

export class Atom extends Token {
    readonly value: string;

    constructor(value: string, linePos?: LinePosition) {
        super(Token.Type.ATOM, linePos);
        this.value = value;
    }
}