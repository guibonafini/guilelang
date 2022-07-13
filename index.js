#!/usr/bin/env node

import fs from 'fs'
import { program } from 'commander';
import { Core } from './core/Core.js';
import chalk from 'chalk';

Core.init();

program.command('run <script-file>').description('Executa um arquivo Guile Esoteric Language').action((scriptFile) => {
    if(!fs.existsSync(scriptFile)) {
        console.log("");
        console.log(chalk.red(`Arquivo ${scriptFile} não encontrado!`));
        console.log("");
        return;
    } 

    const software = Core.parse(fs.readFileSync(scriptFile, 'utf8'));
    software.call();
});

program.parse(process.argv);







