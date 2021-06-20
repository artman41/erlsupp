import { IIterableToken, Token } from "./token";

export class Parenthesis implements Token, IIterableToken {
    readonly type: Token.Type;
    readonly value: Token[];
    [index: number]: Token;

    constructor(...values: Token[]) {
        this.type = Token.Type.PARENTHESIS;
        this.value = values;

        return new Proxy(this, {
            get: function(target, prop, _receiver) {
                if(prop === "type")
                    return target.type;
                if(prop === "value")
                    return target.value;

                let index = Number.parseInt(prop.toString());
                if(index === NaN)
                    return undefined;
                else
                    return target.value[index];
            },
            set: function(_target, _name, _value) {
                throw new Error("Parenthesis is readonly")
            }
        })
    }
}