import { Token, Atom, Keyword } from "../tokens";

export class Boolean extends Keyword implements Token {
    readonly type: Token.Type;

    private static readonly true = "true";
    private static readonly false = "false";

    constructor(keyword: Keyword) {
        super(keyword);
        this.type = Token.Type.BOOLEAN;
    }
    
    static tryParse(keyword: Keyword): Boolean | null {
        switch(keyword.value) {
            case this.true:
                return new Boolean(keyword);
            case this.false:
                return new Boolean(keyword);
            default:
                return null;
        }
    }
    
    static parse(keyword: Keyword): Boolean | never {
        let ret = this.tryParse(keyword);
        if(ret === null)
            throw new Error("Keyword is not a Boolean");;
        return ret;
    }
}