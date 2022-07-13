class Tokenizer {
    static tokens = {};

    static register(name, token) {
        Tokenizer.tokens[name] = token;
    }

    static parse(code) {
        const tokeninzedCode = [];
        const availableTokens = Object.values(Tokenizer.tokens);
        for (let i = 0; i < code.length; i++) {
            const substring = code.substring(i);
            const token = availableTokens.find(token => token.test(substring));
            if (token) {
                const tokenInstance = token.getToken(substring);
                tokeninzedCode.push(tokenInstance);
                i += tokenInstance.length - 1;
            }
        }

        return tokeninzedCode.filter(t => t.type != 'commentLine');
    }
}


export { Tokenizer }