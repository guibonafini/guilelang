import Signal from "../Signal.js";
import { Tokenizer } from "../Tokenizer.js";
import { Token } from "../tokens/Token.js";
import { Command } from "./Command.js";

export class If extends Command {
    static regexp = /^if (?<conditional>(.*))?\:/i;
    type = 'if';
    
    static test(code) {
        return this.regexp.test(code);
    }

    static getToken(code) {
        const match = this.regexp.exec(code);
        return Token.getInstance({
            type: 'if',
            match: match[0],
            params: { 
                conditional: Tokenizer.parse(match.groups.conditional)
            }
        });
    }

    static getInstance(token) {
        const i = new If();
        
        const conditionType = token.params.conditional.type
        const conditionCommandClass = Command.getCommandClass(conditionType);
        i.condition = conditionCommandClass.getInstance(token.params.conditional);
        
        i.then = token.childrens.map(child => {
            const childCommandClass = Command.getCommandClass(child.type);
            return childCommandClass.getInstance(child)
        });

        return i;
    }

    call(memoryTable) {
        let result = null;
        if (this.condition.call(memoryTable)) {
            for (let i = 0; i < this.then.length; i++) {
                result = this.then[i].call(memoryTable);
                if (memoryTable.get('signal', Signal.RETURN)) {
                    break;
                }

                if (memoryTable.get('signal', Signal.BREAK)) {
                    break;
                }
            }
        }

        return result;
    }
}