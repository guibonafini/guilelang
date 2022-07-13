export class Parser {

    /**
     * 
     * @param {object} mainToken
     * @param {string} mainToken.type
     * @param {array} mainToken.childrens
     * @param {Array<mainToken>} tokens 
     * @param {string} expectedEnd
     * @returns {mainToken} mainToken
     */
    static parse(mainToken, tokens, expectedEnd) {
        const openBlock = ['if', 'while', 'fn', 'closure', 'function_call', 'assign', 'return'];
        const closeBlock = ['endif', 'endwhile', 'endfn', 'endclosure', 'endcommand', 'endcommand', 'endcommand'];

        while (tokens.length > 0) {
            const token = tokens.splice(0, 1)[0]
            const tokenType = token.type;
            if (openBlock.includes(tokenType)) {
                mainToken.childrens.push(
                    Parser.parse(
                        token,
                        tokens,
                        closeBlock[openBlock.indexOf(tokenType)]
                    )
                );
            } else if (tokenType == expectedEnd) {
                return mainToken;
            } else {
                mainToken.childrens.push(token);
            }
        }

        return mainToken
    }

    /**
     * @param {object} token 
     * @param {string} token.type
     * @param {array}  token.childrens
     * @returns {token} token
     */

    static groupAssignCommands(token) {
        for (let i = 0; i < (token.childrens || []).length; i++) {
            const child = Parser.clone(token.childrens[i])
            const nextChild = token.childrens[i + 1] ? Parser.clone(token.childrens[i + 1]) : { type: null };
            if (nextChild.type == 'assign') {
                nextChild.params.variable = child.params.variable;
                token.childrens.splice(i, 2, nextChild);
            } else {
                token.childrens[i] = Parser.groupAssignCommands(child)
            }
        }

        return token
    }

    /**
     * @param {object} token 
     * @param {string} token.type
     * @param {array}  token.childrens
     * @returns {token} token
     */
    static groupOperatorCommands(token, depth = 0) {
        for (let i = 0; i < (token.childrens || []).length; i++) {
            const child = Parser.clone(token.childrens[i])
            if (child.type == 'operator' && i > 0) {
                const prevChild = token.childrens[i - 1] ? Parser.clone(token.childrens[i - 1]) : { type: null };
                const nextChild = token.childrens[i + 1] ? Parser.clone(token.childrens[i + 1]) : { type: null };
                child.childrens.push(
                    Parser.groupOperatorCommands(prevChild, depth + 1),
                    Parser.groupOperatorCommands(nextChild, depth + 1),
                )
                token.childrens.splice(i - 1, 3);
                token.childrens.splice(i - 1, 0, child);
                i = i - 1;
            } else {
                token.childrens[i] = Parser.groupOperatorCommands(child, depth + 1)
            }
        }

        return token;
    }

    /**
     * @param {object} token 
     * @param {string} token.type
     * @param {array}  token.childrens
     * @returns {token} token
     */
    static groupComparisonCommands(token, depth = 0) {
        for (let i = 0; i < (token.childrens || []).length; i++) {
            const child = Parser.clone(token.childrens[i])
            if (child.type == 'comparison' && i > 0) {
                const prevChild = token.childrens[i - 1] ? Parser.clone(token.childrens[i - 1]) : { type: null };
                const nextChild = token.childrens[i + 1] ? Parser.clone(token.childrens[i + 1]) : { type: null };
                child.childrens.push(
                    Parser.groupComparisonCommands(prevChild, depth + 1),
                    Parser.groupComparisonCommands(nextChild, depth + 1),
                )
                token.childrens.splice(i - 1, 3);
                token.childrens.splice(i - 1, 0, child);
                i = i - 1;
            } else {
                token.childrens[i] = Parser.groupComparisonCommands(child, depth + 1)
            }

            if (child.params && child.params.conditional) {
                if (child.params.conditional.length) {
                    child.params.conditional = {
                        type: 'closure',
                        childrens: child.params.conditional
                    }
                }

                child.params.conditional = Parser.groupComparisonCommands(
                    child.params.conditional,
                    depth + 1
                )
            }
        }

        return token;
    }

    /**
     * @param {object} token 
     * @param {string} token.type
     * @param {array}  token.childrens
     * @returns {token} token
     */
    static groupLogicGateCommands(token, depth = 0) {
        for (let i = 0; i < (token.childrens || []).length; i++) {
            const child = Parser.clone(token.childrens[i])
            if (child.type == 'logical_gate' && i > 0) {
                const prevChild = token.childrens[i - 1] ? Parser.clone(token.childrens[i - 1]) : { type: null };
                const nextChild = token.childrens[i + 1] ? Parser.clone(token.childrens[i + 1]) : { type: null };
                child.childrens.push(
                    Parser.groupLogicGateCommands(prevChild, depth + 1),
                    Parser.groupLogicGateCommands(nextChild, depth + 1),
                )
                token.childrens.splice(i - 1, 3);
                token.childrens.splice(i - 1, 0, child);
                i = i - 1;
            } else {
                token.childrens[i] = Parser.groupLogicGateCommands(child, depth + 1)
            }

            if (child.params && child.params.conditional) {
                if (child.params.conditional.length) {
                    child.params.conditional = {
                        type: 'closure',
                        childrens: child.params.conditional
                    }
                }

                child.params.conditional = Parser.groupLogicGateCommands(
                    child.params.conditional,
                    depth + 1
                )
            }
        }

        return token;
    }

    /**
     * @param {object} token 
     * @param {string} token.type
     * @param {array}  token.childrens
     * @returns {token} token
     */
    static removeEndCommand(token, depth = 0) {

        token.childrens = token.childrens.filter(child => child.type != 'endcommand').map(child => {
            if (child.childrens.length > 0) {
                return Parser.removeEndCommand(child, depth + 1);
            }
            return child;
        })

        return token;
    }

    static clone(a) {
        return JSON.parse(JSON.stringify(a));
    }
}