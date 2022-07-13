import { Array } from "../functions/Array.js";
import { ArrayItem } from "../functions/ArrayItem.js";
import { Print } from "../functions/Print.js";
import { Size } from "../functions/Size.js";
import { MemoryTable } from "../MemoryTable.js";
import { Command } from "./Command.js";

export class Software extends Command {
    type = 'software';

    call() {
        const memoryTable = MemoryTable.getGlobalInstance();
        memoryTable.setFunction('print', new Print)
        memoryTable.setFunction('array', new Array)
        memoryTable.setFunction('arrayItem', new ArrayItem)
        memoryTable.setFunction('size', new Size)

        let result = null;
        for(let i = 0; i < this.subCommands.length; i++) {
            result = this.subCommands[i].call(memoryTable);
        }
        return result;
    }
}