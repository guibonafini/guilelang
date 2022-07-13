import { Token } from "../tokens/Token.js";
import { Command } from "./Command.js";

export class Variable extends Command {
    static regexp = /^(?<variable>[A-z0-9\_]+)/i;
    type = 'variable';

    static test(code) {
        return this.regexp.test(code);
    }

    static getToken(code) {
        const match = this.regexp.exec(code);
        return Token.getInstance({
            type: 'variable',
            match: match[0],
            params: {
                variable: match.groups.variable
            }
        });
    }

    static getInstance(token) {
        const v = new Variable();
        v.variable = token.params.variable;
        return v;
    }

    call(memoryTable) {
        return memoryTable.get(this.variable);
    }
}