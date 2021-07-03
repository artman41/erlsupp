import { Token } from "../tokens";

export class Number extends Token {
    readonly value: number;

    constructor(value: number) {
        super(Token.Type.NUMBER);
        this.value = value;
    }
}