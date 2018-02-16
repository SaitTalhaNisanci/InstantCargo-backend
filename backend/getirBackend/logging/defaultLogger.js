
var chalk = require('chalk');
var err = chalk.bold.red;
var warning = chalk.bold.yellow;
var info = chalk.bold.green;


function logger(){
    this.err = (err) => {
        console.log(error(err));
    }
    this.warning = (warning) => {
        console.log(warning(warning));
    }
    this.info = (info) => {
        console.log(info(info));
    }
}

module.exports = logger