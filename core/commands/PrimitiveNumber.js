import { Token } from "../tokens/Token.js";
import { Command } from "./Command.js";

export class PrimitiveNumber extends Command {
    static regexp = /^(?<value>((-)?[0-9]+(\.)?([\d]+)?))/i;
    type = 'number';

    static test(code) {
        return this.regexp.test(code);
    }

    static getToken(code) {
        const match = this.regexp.exec(code);
        return Token.getInstance({
            type: 'number',
            match: match[0],
            params: {
                value: match.groups.value
            }
        });
    }

    static getInstance(token) {
        const pN = new PrimitiveNumber();
        pN.value = token.params.value;
        return pN;
    }

    call() {
        return this.value * 1;
    }
}