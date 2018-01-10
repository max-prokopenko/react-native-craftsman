#! /usr/bin/env node

var chalk = require('chalk');
var ProgressBar = require('progress');

//Assigning exec to be able to execute commands
var exec = require('child_process').exec;

//Setting up rogress bar
var barOpts = {
    width: 50,
    total: 150,
    clear: true
};
var bar = new ProgressBar(' Creating project [:bar] :percent :etas', barOpts);

//Arguments passed by user
var userArgs = process.argv.slice(2);

//Checks what command user has passed
var command = userArgs[0];

switch(command) {
    case 'create':
        var projectName = userArgs[1];
        if(projectName && projectName != '') {
            var createProject = exec('react-native init ' + projectName);
            createProject.stdout.on('data', function(data) {
                bar.tick(1);
            });
            createProject.stdout.on('end', function() {
                bar.tick(150);
            });
            
        } else {
            console.error(chalk.red('Craftsman failed! Project name missing'));
        }
        break;
    default:
        console.error(chalk.red('Craftsman failed! Unknown command'));
}


