import Signal from "../Signal.js";
import { Token } from "../tokens/Token.js";
import { Command } from "./Command.js"

export class Break extends Command {
    type = 'break';

    static regexp = /^(break)/i;

    static test(code) {
        return this.regexp.test(code);
    }

    static getToken() {
        return Token.getInstance({ type: 'break', match: `break` });
    }

    static getInstance(token) {
        return new Break();
    }

    call(memoryTable) {
        memoryTable.set('signal', Signal.BREAK);
        return null;
    }

}