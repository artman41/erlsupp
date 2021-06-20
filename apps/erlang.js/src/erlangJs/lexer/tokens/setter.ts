import { Token } from "./token";

export class Setter implements Token {
    readonly type: Token.Type;
    readonly value: [Token | null, Token | null];

    constructor(left: Token | null, right: Token | null) {
        this.type = Token.Type.SETTER;
        this.value = [left, right];
    }
}