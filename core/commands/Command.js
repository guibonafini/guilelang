export class Command {
    static commands = {};
    
    type = 'unknown';
    subCommands = [];

    static register(alias, token) {
        Command.commands[alias] = token;
    }

    static getCommandClass(type) {
        const commandClass = Command.commands[type];
        if(!commandClass) {
            throw new Error(`Command ${type} not found`);
        }

        return commandClass;
    }

    static getInstance(token) {
        const commandClass = Command.getCommandClass(token.type);
        const command = new commandClass(token);
        
        command.subCommands = token.childrens.map(child => {
            const childCommandClass = Command.getCommandClass(child.type);
            return childCommandClass.getInstance(child)
        });

        return command;
    }
}