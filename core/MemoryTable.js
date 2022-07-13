class MemoryTable {
    vars = {
        signal: 0
    }

    functions = {}

    constructor(vars = {}, functions = {}) {
        this.vars = vars
        this.functions = functions
    }

    get(name) {
        if (!this.vars.hasOwnProperty(name)) {
            throw new Error(`Variable ${name} not defined`)
        }

        return this.vars[name];
    }

    set(name, value) {
        this.vars[name] = value
    }

    /**
     * 
     * @param {string} name 
     * @returns {FunctionDefinition} functionDefinition
     */
    getFunction(name) {
        if (!this.functions[name]) {
            throw new Error(`Function ${name} not found`)
        }

        return this.functions[name]
    }

    setFunction(name, fn) {
        this.functions[name] = fn
    }

    dump() {
        return JSON.parse(JSON.stringify(this.vars))
    }

    /**
     * 
     * @returns {MemoryTable}
     */
    static getGlobalInstance() {
        if (!globalThis.memoryTable) {
            globalThis.memoryTable = new MemoryTable
        }
        return globalThis.memoryTable
    }

    /**
     * 
     * @param {MemoryTable} memoryTable 
     * @returns {MemoryTable}
     */
    static clone(memoryTable) {
        return new MemoryTable({ signal: 0, ...memoryTable.vars }, { ...memoryTable.functions })
    }
}

globalThis.memoryTable = globalThis.memoryTable || new MemoryTable
export { MemoryTable };