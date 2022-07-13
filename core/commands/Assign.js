import { Token } from "../tokens/Token.js";
import { Command } from "./Command.js";

export class Assign extends Command {
    static regexp = /^\<\-\-/i;
    type = 'assign';
    
    static test(code) {
        return this.regexp.test(code);
    }

    static getToken() {
        return Token.getInstance({
            type: 'assign',
            match: '<--'
        });
    }

    static getInstance(token) {
        const a = new Assign();
        a.variable = token.params.variable;
        a.subCommands = token.childrens.map(child => {
            const childCommandClass = Command.getCommandClass(child.type);
            return childCommandClass.getInstance(child)
        });
        return a;
    }

    call(memoryTable) {
        let result = null;
        for (let i = 0; i < this.subCommands.length; i++) {
            result = this.subCommands[i].call(memoryTable);
        }
        memoryTable.set(this.variable, result);
    }

    
}