export class FunctionDefinition {
    name: string
    arity: number

    constructor(name: string, arity: number) {
        this.name = name;
        this.arity = arity;
    }
}