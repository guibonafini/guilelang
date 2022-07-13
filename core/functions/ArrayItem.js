export class ArrayItem {
    type = 'FunctionDefinition'

    constructor() {
        this.args = "var";
    }

    execute(memoryTable, [arr, position]) {
        if(!arr) {
            return null;
        }

        if(!Array.isArray(arr) && (typeof arr != 'string')) {
            throw new Error('ArrayItem function can only be used with arrays or strings');
        }

        if(position < 0 || position >= arr.length) {
            throw new Error('Index out of bounds');
        }

        return arr[position];
    }
}