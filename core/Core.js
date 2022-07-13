import { Software } from './commands/index.js';
import { Parser } from './Parser.js';
import { Tokenizer } from './Tokenizer.js';
import TokensList from './tokens/index.js';

export class Core {
    static init() {
        TokensList.tokens.forEach((token, index) => {
            Tokenizer.register(index, token);
        })
    }

    /**
     * 
     * @param {*} code 
     * @returns {Software}
     */
    static parse(code) {
        const codeTokens = Tokenizer.parse(code);
        const soft = { type: 'software', childrens: [] };
        const parsedCode = Parser.removeEndCommand(
            Parser.groupLogicGateCommands(
                Parser.groupComparisonCommands(
                    Parser.groupOperatorCommands(
                        Parser.groupAssignCommands(
                            Parser.parse(soft, codeTokens)
                        )
                    )
                )
            )
        )
        
        // return parsedCode;
        return Software.getInstance(parsedCode);
    }
}