import { MemoryTable } from "../MemoryTable.js";
import { Token } from "../tokens/Token.js";
import { Command } from "./Command.js";

export class FunctionCall extends Command {
    static regexp = /^(?<fnName>([A-z][A-z0-9]+))\:/i;
    type = 'functionCall';
    functionName = '';
    params = [];

    static test(code) {
        return this.regexp.test(code);
    }

    static getToken(code) {
        const match = this.regexp.exec(code);
        return Token.getInstance({
            type: 'function_call',
            match: match[0],
            params: { 
                functionName: match.groups.fnName
            }
        });
    }

    static getInstance(token) {
        const fC = new FunctionCall();
        fC.functionName = token.params.functionName;
        fC.params = token.childrens.map(child => {
            const childCommandClass = Command.getCommandClass(child.type);
            return childCommandClass.getInstance(child)
        });
        return fC;
    }

    /**
     * 
     * @param {MemoryTable} memoryTable 
     */
    call(memoryTable) {
        const fn = memoryTable.getFunction(this.functionName);
        const params = this.params.map(param => param.call(memoryTable));
        return fn.execute(memoryTable, params);
    }
}