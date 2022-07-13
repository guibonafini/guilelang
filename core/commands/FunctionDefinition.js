import { MemoryTable } from "../MemoryTable.js";
import Signal from "../Signal.js";
import { Token } from "../tokens/Token.js";
import { Command } from "./Command.js";

export class FunctionDefinition extends Command {
    static regexp = /^fn (?<functionName>([A-z][A-z0-9]+))(( \((?<args>(.*))\))?)\:/i;
    type = 'function';
    functionName = null;

    static test(code) {
        return this.regexp.test(code);
    }

    static getToken(code) {
        const match = this.regexp.exec(code);
        return Token.getInstance({
            type: 'fn',
            match: match[0],
            params: {
                functionName: match.groups.functionName,
                args: match.groups.args
            }
        });
    }

    static getInstance(token) {
        const f = new FunctionDefinition();
        
        f.functionName = token.params.functionName;
        f.args = (token.params.args || '').split(` `);
        f.subCommands = token.childrens.map(child => {
            const childCommandClass = Command.getCommandClass(child.type);
            return childCommandClass.getInstance(child)
        });
        return f;
    }

    /**
     * 
     * @param {MemoryTable} memoryTable 
     */
    call(memoryTable) {
        const functionName = this.functionName;
        memoryTable.setFunction(functionName, this);
    }

    execute(memoryTable, params) {
        const newMemoryTable = MemoryTable.clone(memoryTable);
        this.args.forEach((arg, index) => {
            newMemoryTable.set(arg, params[index]);
        });
        
        let result = null;
        for (let i = 0; i < this.subCommands.length; i++) {
            result = this.subCommands[i].call(newMemoryTable);
            if (newMemoryTable.get('signal') == Signal.RETURN) {
                break;
            }
        }
        return result;
    }
}