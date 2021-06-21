import { Token } from "../tokens";

export class Compare implements Token {
    readonly type: Token.Type;
    readonly value: [Token | null, Token | null];
    readonly isExact: boolean;
    readonly isNot: boolean;

    constructor(left: Token | null, right: Token | null, Options: Compare.Options = {}) {
        this.type = Token.Type.COMPARE;
        this.value = [left, right];
        this.isExact = Options.exact === undefined ? false : Options.exact;
        this.isNot = Options.not === undefined ? false : Options.not;
    }
}

export namespace Compare {
    export type Options = {
        exact?: boolean,
        not?: boolean
    }
}