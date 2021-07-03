import { Token } from "../tokens";

export class Atom extends Token {
    readonly value: string;

    constructor(value: string) {
        super(Token.Type.ATOM);
        this.value = value;
    }
}