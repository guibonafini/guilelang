import { Token } from "./Token.js";

export class CommentLine {
    static regexp = /^\/\/(.*?)$/im;

    static test(code) {
        return this.regexp.test(code);
    }

    static getToken(code) {
        const match = this.regexp.exec(code);
        return Token.getInstance({
            type: 'commentLine',
            match: match[0]
        });
    }
}