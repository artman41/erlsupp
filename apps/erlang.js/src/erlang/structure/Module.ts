import { FunctionDefinition } from "./FunctionDefinition";

export class Module {
    name: string;
    exports: FunctionDefinition[],
    attributes: {name: string, values: any[]}[],
    
}