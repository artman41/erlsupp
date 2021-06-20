import { Token } from "./token";

export class Add implements Token {
    readonly type: Token.Type;
    readonly value: [Token | null, Token | null];

    constructor(left: Token | null, right: Token | null) {
        this.type = Token.Type.ADD;
        this.value = [left, right];
    }
}