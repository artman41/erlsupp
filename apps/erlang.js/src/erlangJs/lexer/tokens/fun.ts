import { Atom } from "./atom";
import { Parenthesis } from "./parenthesis";
import { Token } from "./token";

export class Fun implements Token {
    readonly type: Token.Type;
    readonly name: Atom;
    readonly args: Parenthesis;
    readonly guards: Token[];
    readonly value: Token[];
    readonly isAnonymous: boolean;

    constructor(name: Atom, args: Parenthesis, guards: Token[], values: Token[], isAnonymous: boolean = false) {
        this.type = Token.Type.FUN;
        this.name = name;
        this.args = args;
        this.guards = guards;
        this.value = values;
        this.isAnonymous = isAnonymous;
    }
}