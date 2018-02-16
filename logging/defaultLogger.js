
var chalk = require('chalk');
var error = chalk.bold.red;
var warning = chalk.bold.yellow;
var info = chalk.bold.green;


function logger(){
    this.err = (err) => {
        console.log(error(err));
    }
    this.warning = (warning) => {
        console.log(warning(warning));
    }
    this.info = (message) => {
        console.log(info(message));
    }
}

module.exports = logger