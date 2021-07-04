import { Lexer } from "./erlangJs/lexer";
import { LinePosition } from "./erlangJs/lexer/line_position";
import { Token } from "./erlangJs/lexer/tokens";

export class ErlangJs {

    private static __instance = new ErlangJs();

    private lexer: Lexer;

    private constructor() {
        this.lexer = new Lexer();
    }

    static tokenise(str: string): Token[] {
        let tokenised = this.__instance.lexer.tokenise(str);
        if (tokenised instanceof Error)
            throw tokenised;
        return tokenised.value
    }

    static tokeniseSingle(str: string): [Token, number, LinePosition] {
        let tokenised = this.__instance.lexer.tokeniseSingle(str);
        if (tokenised instanceof Error)
            throw tokenised;
        return tokenised.value
    }

    static parse(str: string) {
        return this.__instance.__parse(str);
    }

    private __parse(str: string) {
        return null;
    }

}