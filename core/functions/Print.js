export class Print {
    type = 'FunctionDefinition'

    constructor() {
        this.args = "printValue_" + Math.floor(Math.random() * 9999);
    }

    execute(memoryTable, params) {
        console.log(...params);
        return null;
    }
}