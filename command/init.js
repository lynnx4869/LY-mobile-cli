/**
 * Created by xianing on 2017/4/20.
 */

const co = require('co');
const prompt = require('co-prompt');
const chalk = require('chalk');
const path = require('path');
const os = require('os');
const fileUtil = require('../public/fileUtil.js');
const cmdUtil = require('../public/cmdUtil.js');

let packageJson = {
    name: '',
    version: '',
    description: '',
    main: '',
    author: '',
    license: '',
    dependencies: {},
    devDependencies: {},
    scripts: {
        ios: 'webpack --config webpack.ios.dev.config.js --progress',
        as: 'webpack --config webpack.as.dev.config.js --progress',
        pro: 'webpack --config webpack.pro.config.js --progress'
    }
};

module.exports = () => {

    co(function*() {
        let name = yield prompt('name :');
        while (1) {
            if (name == '') {
                console.log(chalk.red('You did not enter the project name!'));
                name = yield prompt('name :');
                continue;
            } else {
                break;
            }
        }

        let version = yield prompt('version :');
        let description = yield prompt('description :');
        let entryPoint = yield prompt('entry point :');
        let author = yield prompt('author :');
        let license = yield prompt('license :');

        packageJson.name = name;
        packageJson.version = version == '' ? '1.0.0' : version;
        packageJson.description = description;
        packageJson.main = entryPoint == '' ? 'index.js' : entryPoint;
        packageJson.author = author;
        packageJson.license = license == '' ? 'MIT' : license;

        const projectPath = path.resolve('./' + name);
        const originPath = path.resolve(__dirname + '/../templates/mobile-template');

        yield fileUtil.makeDir(projectPath);
        yield fileUtil.copyFile(path.join(originPath, 'mobile-template.zip'),
            path.join(projectPath, 'mobile-template.zip'));

        let type = os.type();
        if (type == 'Windows_NT') {
            yield cmdUtil('expand ' + path.join(projectPath, 'mobile-template.zip'), projectPath);
        } else {
            yield cmdUtil('unzip ' + path.join(projectPath, 'mobile-template.zip'), projectPath);
        }

        yield fileUtil.createFile(path.join(projectPath, 'package.json'), packageJson);

        let cmdStr1 = 'sudo npm i --save react react-dom react-router@3.x ' +
            'superagent moment lodash watchjs';
        console.log(chalk.green('npm dependencies run ...'));
        yield cmdUtil(cmdStr1, projectPath);

        let cmdStr2 = 'sudo npm i --save-dev babel-core babel-loader ' +
            'babel-plugin-transform-runtime babel-preset-env babel-preset-react' +
            ' copy-webpack-plugin css-loader file-loader path style-loader url-loader webpack';
        console.log(chalk.green('npm devDependencies run ...'));
        yield cmdUtil(cmdStr2, projectPath);

        process.exit();
    });

};
