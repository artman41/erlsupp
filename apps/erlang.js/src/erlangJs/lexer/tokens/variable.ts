import { Token } from "../tokens";

export class Variable extends Token {
    readonly value: string;
    readonly isIgnored: boolean;

    constructor(value: string) {
        super(Token.Type.VARIABLE);
        this.value = value;
        this.isIgnored = value === "_";
    }
}