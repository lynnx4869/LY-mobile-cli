/**
 * Created by xianing on 2017/4/24.
 */

const exec = require('child_process').exec;
const chalk = require('chalk');

module.exports = (cmdStr, dir) => {
    return new Promise((resolve, reject) => {
        exec(cmdStr, {cwd: dir}, (error, stdout, stderr) => {
            if (error) {
                console.log(chalk.red(error));
                reject();
            } else {
                console.log(chalk.green(stdout));
                resolve();
            }
        });
    });
};
