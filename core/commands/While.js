import Signal from "../Signal.js";
import { Tokenizer } from "../Tokenizer.js";
import { Token } from "../tokens/Token.js";
import { Command } from "./Command.js";

export class While extends Command {
    static regexp = /^while (?<conditional>(.*))?\:/i;
    type = 'while';

    static test(code) {
        return this.regexp.test(code);
    }

    static getToken(code) {
        const match = this.regexp.exec(code);
        return Token.getInstance({
            type: 'while',
            match: match[0],
            params: {
                conditional: Tokenizer.parse(match.groups.conditional)
            }
        });
    }

    static getInstance(token) {
        const w = new While();

        const conditionType = token.params.conditional.type
        const conditionCommandClass = Command.getCommandClass(conditionType);
        w.condition = conditionCommandClass.getInstance(token.params.conditional);
        
        w.subCommands = token.childrens.map(child => {
            const childCommandClass = Command.getCommandClass(child.type);
            return childCommandClass.getInstance(child)
        });

        return w;
    }

    call(memoryTable) {
        let result = null;
        while (this.condition.call(memoryTable)) {
            let signalCode = 0;
            for (let i = 0; i < this.subCommands.length; i++) {
                result = this.subCommands[i].call(memoryTable);
                
                signalCode = memoryTable.get('signal')
                if (signalCode == Signal.RETURN) {
                    return result;
                } else if (signalCode == Signal.BREAK ||  signalCode == Signal.CONTINUE) {
                    break;
                }
            }

            memoryTable.set('signal', 0);
            if (signalCode == Signal.BREAK) {
                break;
            }
        }

        return result;
    }
}