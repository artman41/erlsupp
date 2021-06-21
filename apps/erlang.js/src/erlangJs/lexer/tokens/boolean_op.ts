import { Token, Keyword } from "../tokens";

export class BooleanOp implements Token {
    readonly type: Token.Type;
    readonly value: BooleanOp.Type;
    readonly left: Token | null;
    readonly right: Token | null;

    
    private static readonly and = "and";
    private static readonly andalso = "andalso";
    private static readonly or = "or";
    private static readonly orelse = "orelse";
    private static readonly not = "not";

    constructor(boolType: BooleanOp.Type, left: Token | null, right: Token | null) {
        this.type = Token.Type.BOOLEAN_OP;
        this.value = boolType;
        this.left = left;
        this.right = right;
    }

    static tryParse(keyword: Keyword, left: Token | null, right?: Token | null): BooleanOp | null {
        let boolType: BooleanOp.Type;
        switch(keyword.value) {
            case BooleanOp.and:
                boolType = BooleanOp.Type.AND;
                break;
            case BooleanOp.andalso:
                boolType = BooleanOp.Type.ANDALSO;
                break;
            case BooleanOp.or:
                boolType = BooleanOp.Type.OR;
                break;
            case BooleanOp.orelse:
                boolType = BooleanOp.Type.ORELSE;
                break;
            case BooleanOp.not:
                boolType = BooleanOp.Type.NOT;
                break;
            default:
                return null;
        }
        return new BooleanOp(boolType, left, right === undefined ? null : right);
    }
    
    static parse(keyword: Keyword, left: Token | null, right?: Token | null): BooleanOp | never {
        let ret = this.tryParse(keyword, left, right);
        if(ret === null)
            throw new Error("Keyword is not a Boolean Operator");
        return ret;
    }
}

export namespace BooleanOp {
    export enum Type {
        AND,
        ANDALSO,
        OR,
        ORELSE,
        NOT
    }
}