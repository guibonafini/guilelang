import { Token } from "../tokens/Token.js";
import { Command } from "./Command.js";

export class LogicalGate extends Command {
    static regexp = /^(?<logical_gate>(and|or|xor|nand|nor|xnor))/i;
    type = 'logicalGate';

    static test(code) {
        return this.regexp.test(code);
    }

    static getToken(code) {
        const match = this.regexp.exec(code);
        return Token.getInstance({
            type: 'logical_gate',
            match: match[0],
            params: {
                logical_gate: match.groups.logical_gate
            }
        });
    }

    static getInstance(token) {
        const o = new LogicalGate();
        o.operator = token.params.logical_gate;
        o.subCommands = token.childrens.map(child => {
            const childCommandClass = Command.getCommandClass(child.type);
            return childCommandClass.getInstance(child)
        });
        return o;
    }

    doOperation(a, b) {
        switch (this.operator) {
            case 'and':
                return a && b;
            case 'or':
                return a || b;
            case 'xor':
                return a != b;
            case 'nor':
                return !(a || b);
            case 'nand':
                return !(a && b);
            case 'xnor':
                return a == b;
            default:
                throw new Error(`Unknown operator ${this.operator}`);
        }
    }

    call(memoryTable) {
        let result = this.subCommands[0].call(memoryTable);
        for (let i = 1; i < this.subCommands.length; i++) {
            result = this.doOperation(result, this.subCommands[i].call(memoryTable));
        }
        return result;
    }
}