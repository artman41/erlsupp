import { Token } from "../tokens";

export class Divide implements Token {
    readonly type: Token.Type;
    readonly value: [Token | null, Token | null];

    constructor(left: Token | null, right: Token | null) {
        this.type = Token.Type.DIVIDE;
        this.value = [left, right];
    }
}