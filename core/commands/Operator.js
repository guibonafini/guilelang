import { Token } from "../tokens/Token.js";
import { Command } from "./Command.js";

export class Operator extends Command {
    static regexp = /^(?<operator>(\+|\-|\/|\*|\%|\^|plus|minus|times|divided by|power))/i;
    type = 'operator';

    static test(code) {
        return this.regexp.test(code);
    }

    static getToken(code) {
        const match = this.regexp.exec(code);
        return Token.getInstance({
            type: 'operator',
            match: match[0],
            params: {
                operator: match.groups.operator
            }
        });
    }

    static getInstance(token) {
        const o = new Operator();
        o.operator = token.params.operator;
        o.subCommands = token.childrens.map(child => {
            const childCommandClass = Command.getCommandClass(child.type);
            return childCommandClass.getInstance(child)
        });
        return o;
    }

    doOperation(a, b) {
        switch (this.operator) {
            case 'plus':
            case '+':
                return a + b;
            case 'minus':
            case '-':
                return a - b;
            case 'times':
            case '*':
                return a * b;
            case 'divided by':
            case '/':
                return a / b;
            case '%':
                return a % b;
            case 'power':
            case '^':
                return Math.pow(a, b);
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