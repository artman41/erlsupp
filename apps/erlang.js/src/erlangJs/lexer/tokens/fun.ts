import { Atom } from "./atom";
import { Parenthesis } from "./parenthesis";
import { Token } from "./token";

export class Fun implements Token {
    readonly type: Token.Type;
    readonly name: Atom;
    readonly guards: Token[];
    readonly value: Fun.Case[];
    readonly isAnonymous: boolean;

    constructor(name: Atom, guards: Token[], cases: Fun.Case[], isAnonymous: boolean = false) {
        this.type = Token.Type.FUN;
        this.name = name;
        this.guards = guards;
        this.value = cases;
        this.isAnonymous = isAnonymous;
    }
}

export namespace Fun {
    export class Case {
        args: Parenthesis;
        tokens: Token[];

        constructor(args: Parenthesis, ...tokens: Token[]) {
            this.args = args;
            this.tokens = tokens;
        }
    }
}