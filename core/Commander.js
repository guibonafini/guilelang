export class Command {
    static commands = [];

    static register(name, token) {
        Command.commands[name] = token;
    }

    
}