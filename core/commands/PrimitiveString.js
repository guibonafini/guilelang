import { Token } from "../tokens/Token.js";
import { Command } from "./Command.js";

export class PrimitiveString extends Command {
    static regexp = /^\"(?<value>(.*?))\"/i;
    type = 'string';

    static test(code) {
        return this.regexp.test(code);
    }

    static getToken(code) {
        const match = this.regexp.exec(code);
        return Token.getInstance({
            type: 'string',
            match: match[0],
            params: { value: match.groups.value },
        });
    }

    static getInstance(token) {
        const pS = new PrimitiveString();
        pS.value = token.params.value;
        return pS;
    }

    call(memoryTable) {
        return this.value;
    }
}