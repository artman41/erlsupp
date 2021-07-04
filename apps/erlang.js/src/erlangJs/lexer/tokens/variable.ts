import { LinePosition } from "../line_position";
import { Token } from "../tokens";

export class Variable extends Token {
    readonly value: string;
    readonly isIgnored: boolean;
    readonly isUseable: boolean;

    constructor(value: string, linePos?: LinePosition) {
        super(Token.Type.VARIABLE, linePos);
        this.value = value;
        this.isIgnored = value[0] === "_";
        this.isUseable = value !== "_";
    }
}