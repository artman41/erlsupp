import { Lexer } from "./erlangJs/lexer";

export class ErlangJs {

    private static __instance = new ErlangJs();

    private lexer: Lexer;

    private constructor() {
        this.lexer = new Lexer();
    }

    static tokenise(str: string): any {
        return this.__instance.lexer.tokenise(str);
    }

    static parse(str: string) {
        return this.__instance.__parse(str);
    }

    private __parse(str: string) {
        return null;
    }

}