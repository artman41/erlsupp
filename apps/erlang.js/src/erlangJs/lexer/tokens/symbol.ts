import { Token } from "../tokens";

export class Symbol extends Token {
    readonly value: string;

    constructor(value: string) {
        super(Token.Type.SYMBOL)
        this.value = value;
    }
}