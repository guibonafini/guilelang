import { Token } from "../tokens/Token.js";
import { Command } from "./Command.js";

export class Comparison extends Command {
    static regexp = /^(?<comparison>(\<\=?|\>\=?|\=|\!\=|(is (greater|less|more)( or equal)? than)|(is( not)?)))/i;
    type = 'comparison';

    static test(code) {
        return this.regexp.test(code);
    }

    static getToken(code) {
        const match = this.regexp.exec(code);
        return Token.getInstance({
            type: 'comparison',
            match: match[0],
            params: {
                comparison: match.groups.comparison
            }
        });
    }

    static getInstance(token) {
        const c = new Comparison();
        c.operator = token.params.comparison;
        c.subCommands = token.childrens.map(child => {
            const childCommandClass = Command.getCommandClass(child.type);
            return childCommandClass.getInstance(child)
        });
        return c;
    }

    doOperation(a, b) {
        switch (this.operator) {
            case 'is':
            case '=':
                return a == b;
            case 'is not':
            case '!=':
                return a != b;
            case 'is less than':
            case '<':
                return a < b;
            case 'is less or equal than':
            case '<=':
                return a <= b;
            case 'is greater than':
            case 'is more than':
            case '>':
                return a > b;
            case 'is greater or equal than':
            case 'is more or equal than':
            case '>=':
                return a >= b;
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