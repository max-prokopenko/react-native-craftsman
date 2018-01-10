#! /usr/bin/env node

var chalk = require('chalk');
var ProgressBar = require('progress');
var fs = require('fs');
var clear = require('clear');
var figlet = require('figlet');
var touch = require("touch");


//Files
var indexFile = fs.readFileSync(require.resolve("./files/index"), "utf8");
var routerFile = fs.readFileSync(require.resolve("./files/router"), "utf8");
var mainViewFile = fs.readFileSync(require.resolve("./files/main.js"), "utf8");
var stylesFile = fs.readFileSync(require.resolve("./files/styles.js"), "utf8");
var actionFile = fs.readFileSync(require.resolve("./files/dummyAction"), "utf8");
var reducerFile = fs.readFileSync(require.resolve("./files/dummyReducer"), "utf8");
var reducerIndexFile = fs.readFileSync(require.resolve("./files/reducerIndex.js"), "utf8");



//Assigning exec to be able to execute commands
var exec = require('child_process').exec;

var projectName = '';
var dirs = [
    '/src',
    '/src/config',
    '/src/images',
    '/src/views',
    '/src/views/Main',
    '/src/components',
    '/src/reducers',
    '/src/actions',
];

var packages = [
    'react-navigation',
    'react-redux',
    'redux',
    'redux-logger',
    'redux-observable',
    'redux-thunk',
    'rxjs',
    '@shoutem/ui'
];

//Arguments passed by user
var userArgs = process.argv.slice(2);

//Checks what command user has passed
var command = userArgs[0];

switch(command) {
    case 'create':
        clear();
        console.log('', '', '');
        console.log(
        chalk.yellow(
            figlet.textSync('Craft', { horizontalLayout: 'full' })
        )
        );
        projectName = userArgs[1];
        if(projectName && projectName != '') {
            //Setting up rogress bar
            var barOpts = {
                width: 50,
                total: 150,
                clear: true
            };
            var bar = new ProgressBar(' Creating project [:bar] :percent :etas', barOpts);

            var createProject = exec('react-native init ' + projectName);
            createProject.stdout.on('data', function(data) {
                bar.tick(1);
            });
            createProject.stdout.on('end', function() {
                //Filling progress bar to the and and hiding it
                bar.tick(150);
                console.log('');
                for(var i=0; i < dirs.length; i++) {
                    var dir = './' + projectName + dirs[i];
                    if (!fs.existsSync(dir)){
                        fs.mkdirSync(dir);
                    }
                }
                console.log('');
                console.log('', 'Craft is installing requered packages...', '');
                var packageString = '';
                for(var j=0; j< packages.length; j++) {
                    packageString = packageString + ' ' + packages[j];
                }
                installPackageInitial(packageString, function(){
                    var barOptsD = {
                        width: 50,
                        total: 6,
                        clear: true
                    };
                    console.log('');
                    console.log('', 'Craft is adding requered files...', '');
                    var barD = new ProgressBar('Writing files [:bar] :percent :etas', barOptsD);
                    indexFile = indexFile.replace(/name_to_replace/gi, projectName);
                    fs.writeFile('./' + projectName + '/index.js', indexFile, function(err) {
                        if (err) throw err;
                    });
                    barD.tick(1);
                    fs.writeFile('./' + projectName + '/src/config/router.js', routerFile, function(err) {
                        if (err) throw err;
                    });
                    barD.tick(2);
                    fs.writeFile('./' + projectName + '/src/views/Main/index.js', mainViewFile, function(err) {
                        if (err) throw err;
                    });
                    barD.tick(3);
                    fs.writeFile('./' + projectName + '/src/actions/dummyAction.js', actionFile, function(err) {
                        if (err) throw err;
                    });
                    barD.tick(4);
                    fs.writeFile('./' + projectName + '/src/reducers/dummyReducer.js', reducerFile, function(err) {
                        if (err) throw err;
                    });
                    barD.tick(5);
                    fs.writeFile('./' + projectName + '/src/reducers/index.js', reducerIndexFile, function(err) {
                        if (err) throw err;
                    });
                    barD.tick(6);
                    fs.writeFile('./' + projectName + '/src/views/Main/styles.js', stylesFile, function(err) {
                        if (err) throw err;
                    });
                    barD.tick(7);
                
                    console.log('');
                    console.log(chalk.green(' Craft successfully added files!'));   
                    console.log('');
                    console.log('', 'Craft is finalizing craft...', '');
                    exec('npm install', {cwd: './' + projectName}, function(
                        err,
                        stdout,
                        stderr
                    ) {
                        console.log('');
                        console.log(chalk.green(' Craft successfully installed core project!🎉🎉🎉'));    
                        console.log('');
                        console.log('');
                        console.log('');
                    });
                    
                }, projectName)
                
                
            });
            
        } else {
            console.error(chalk.red('Craft failed! Project name missing'));
        }
        break;
    case 'add':
        var moduleName = userArgs[1];
        if(moduleName && moduleName != '') {
            switch(moduleName) {
                case 'navigation':
                        console.log('');
                        console.log('Craft is installing navigation...');
                        installPackage('react-navigation', function() {
                            console.log('');
                            createConfigFolder(function() {
                                console.log(chalk.green('Craft successfully installed navigation!')); 
                            });
                        });
                    break;
                default:
                    console.error(chalk.red('Craft failed! Unknown command'));
            }
        } else {
            console.error(chalk.red('Craft failed! Project name missing'));
        }
        break;
    default:
        console.error(chalk.red('Craft failed! Unknown command'));
}

function installPackage(packageName, done) {
   var folder = exec('ls -a | grep package.json', function(
        err,
        stdout,
        stderr
      ) {
        if(stdout) {
           
            exec('npm install ' + packageName, function(
                err,
                stdout,
                stderr
            ) {
                done();
            });
        } else {
            console.error(chalk.red('Craft failed! Project missing package.json'));
        }
      });
}

function installPackageInitial(packageName, done, projectName) {
    var folder = exec('ls -a | grep package.json', {cwd: './' + projectName}, function(
         err,
         stdout,
         stderr
       ) {
         if(stdout) {
             exec('npm install ' + packageName, {cwd: './' + projectName}, function(
                 err,
                 stdout,
                 stderr
             ) {
                done();
             });
         } else {
             console.error(chalk.red('Craft failed! Project missing package.json'));
         }
       });
 }
 
//function for creating config folder into ./src
function createConfigFolder(done) {
    var dir = './src/config';
    
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
        done();
    }
}