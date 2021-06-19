export class ErlangUtils {
    static isAtom(str: string): boolean {
        let regex = /^(?:([a-z][a-z_0-9]+)|'(.+?)')$/

        return regex.test(str);
    }
}