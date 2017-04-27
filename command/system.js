/**
 * Created by xianing on 2017/4/27.
 */

const os = require('os');
const chalk = require('chalk');

module.exports = () => {
    console.log(chalk.green(os.platform()));
    console.log(chalk.green(os.release()));
    console.log(chalk.green(os.type()));
};