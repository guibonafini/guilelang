export class Size {
    type = 'FunctionDefinition'

    constructor() {
        this.args = "var";
    }

    execute(memoryTable, [param]) {
        if(!Array.isArray(param) && (typeof param != 'string')) {
            throw new Error('Size function can only be used with arrays or strings');
        }

        return param.length;
    }
}