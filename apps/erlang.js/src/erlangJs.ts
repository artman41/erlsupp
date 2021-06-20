import { Lexer } from "./erlangJs/lexer";
import { Token } from "./erlangJs/lexer/tokens";

export class ErlangJs {

    private static __instance = new ErlangJs();

    private lexer: Lexer;

    private constructor() {
        this.lexer = new Lexer();
    }

    static tokenise(str: string): [Token[], string | null] {
        return this.__instance.lexer.tokenise(str);
    }

    static parse(str: string) {
        return this.__instance.__parse(str);
    }

    private __parse(str: string) {
        return null;
    }

}