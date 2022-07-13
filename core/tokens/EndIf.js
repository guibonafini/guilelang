import { Token } from "./Token.js";

export class EndIf {
    static regexp = /^:endif/i;
    static test(code) {
        return this.regexp.test(code);
    }

    static getToken() {
        return Token.getInstance({
            type: 'endif',
            match: ':endif'
        });
    }
}