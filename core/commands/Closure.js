import { Token } from "../tokens/Token.js";
import { Command } from "./Command.js";

export class Closure extends Command {
    static regexp = /^\(/i;
    type = 'closure';

    static test(code) {
        return this.regexp.test(code);
    }

    static getToken() {
        return Token.getInstance({
            type: 'closure',
            match: '(',
        });
    }

    call(memoryTable) {
        let result = null;
        for (let i = 0; i < this.subCommands.length; i++) {
            result = this.subCommands[i].call(memoryTable);
        }
        return result;
    }

}