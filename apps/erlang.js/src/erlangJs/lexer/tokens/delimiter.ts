import { Token } from "../tokens";

export class Delimiter implements Token {
    readonly type: Token.Type;
    readonly value: string;

    constructor(value: string) {
        this.type = Token.Type.DELIMITER;
        this.value = value;
    }
}