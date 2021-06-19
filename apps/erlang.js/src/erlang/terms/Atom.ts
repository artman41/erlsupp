export class Atom {
    value: string

    constructor(value: string) {
        this.value = value;
    }
    
    static isAtom(str: string): boolean {
        let regex = /^(?:([a-z][a-z_0-9]+)|'(.+?)')$/

        return regex.test(str);
    }
}