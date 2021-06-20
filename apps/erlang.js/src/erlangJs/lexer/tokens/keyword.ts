import { Atom } from "./atom";
import { Token } from "./token";

export class Keyword extends Atom {
    readonly type: Token.Type;

    private static readonly keywords = [
        "begin",
        "end",
        "fun",
        "if",
        "case",
        "of"
    ];

    private constructor(atom: Atom) {
        super(atom.value);
        this.type = Token.Type.KEYWORD;
    }
    
    static tryParse(atom: Atom): Keyword | null {
        return this.keywords.includes(atom.value) ? new Keyword(atom) : null;
    }
    
    static parse(atom: Atom): Keyword | never {
        if(this.keywords.includes(atom.value))
            return new Keyword(atom);
        else
            throw new Error("Atom is not a Keyword");
    }
}