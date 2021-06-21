import { Token, Atom } from "../tokens";

export class Keyword extends Atom {
    readonly type: Token.Type;

    private static readonly keywords = [
        "begin",
        "end",
        "fun",
        "if",
        "case",
        "of",
        "when",
        "and",
        "andalso",
        "or",
        "orelse",
        "true",
        "false",
        "not",
        "rem",
        "div",
        "band",
        "bor",
        "bxor",
        "bnot",
    ];

    protected constructor(atom: Atom) {
        super(atom.value);
        this.type = Token.Type.KEYWORD;
    }
    
    static tryParse(atom: Atom): Keyword | null {
        return this.keywords.includes(atom.value) ? new Keyword(atom) : null;
    }
    
    static parse(atom: Atom): Keyword | never {
        let ret = this.tryParse(atom);
        if(ret === null)
            throw new Error("Atom is not a Keyword");;
        return ret;
    }
}