import Signal from "../Signal.js";
import { Token } from "../tokens/Token.js";
import { Command } from "./Command.js"

export class Return extends Command {
    static regexp = /^return(\:)?/i;
    type = 'Return';

    static test(code) {
        return this.regexp.test(code);
    }

    static getToken(code) {
        const match = this.regexp.exec(code);
        return Token.getInstance({
            type: 'return',
            match: match[0]
        });
    }

    static getInstance(token) {
        const r = new Return();
        r.subCommands = token.childrens.map(child => {
            const childCommandClass = Command.getCommandClass(child.type);
            return childCommandClass.getInstance(child)
        })
        return r;
    }

    call(memoryTable) {
        let result = null;
        for (let i = 0; i < this.subCommands.length; i++) {
            result = this.subCommands[i].call(memoryTable);
        }
        memoryTable.set('signal', Signal.RETURN);
        return result;
    }
}