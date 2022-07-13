import { Token } from "./Token.js";

export class EndCommand {
    static regexp = /^\;/i;

    static test(code) {
        return this.regexp.test(code);
    }

    static getToken() {
        return Token.getInstance({
            type: 'endcommand',
            match: ';'
        });
    }
}