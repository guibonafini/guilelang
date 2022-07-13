import { Token } from "./Token.js";

export class EndWhile {
    static regexp = /^:endwhile/i;
    static test(code) {
        return this.regexp.test(code);
    }

    static getToken() {
        return Token.getInstance({
            type: 'endwhile',
            match: ':endwhile'
        });
    }
}