export class Array {
    type = 'FunctionDefinition'

    constructor() {
        this.args = "any_values";
    }

    execute(memoryTable, params) {
        return params;
    }
}