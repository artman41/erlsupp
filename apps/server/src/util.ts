export namespace Util {

    export class Hash { 
        static cyrb53(str: string, seed: number = Date.now()) {
            let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
            for (let i = 0, ch; i < str.length; i++) {
                ch = str.charCodeAt(i);
                h1 = Math.imul(h1 ^ ch, 2654435761);
                h2 = Math.imul(h2 ^ ch, 1597334677);
            }
            h1 = Math.imul(h1 ^ (h1>>>16), 2246822507) ^ Math.imul(h2 ^ (h2>>>13), 3266489909);
            h2 = Math.imul(h2 ^ (h2>>>16), 2246822507) ^ Math.imul(h1 ^ (h1>>>13), 3266489909);
            return 4294967296 * (2097151 & h2) + (h1>>>0);
        };

        static javaHashCode(str: string): number {
            var h: number = 0;
            for (var i = 0; i < str.length; i++) {
                h = 31 * h + str.charCodeAt(i);
            }
            return h & 0xFFFFFFFF
        }
    }

    export function NOT_IMPLEMENTED(): never {
        throw new Error("Not Implemented");
    }

}