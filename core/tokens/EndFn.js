import { Token } from "./Token.js";

export class EndFn {
    static regexp = /^:endfn/i;
    static test(code) {
        return this.regexp.test(code);
    }

    static getToken() {
        return Token.getInstance({
            type: 'endfn',
            match: ':endfn'
        });
    }
}