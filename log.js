const fs = require('node:fs');
const chalk = require("chalk")

async function logPath(path, name) {
    if (name == null) {
        var date = new Date();
        var name = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + ".log";
    }
    var file = path + name;
    if (!fs.existsSync(path)){
        fs.mkdirSync(path);
    }
    if (!fs.existsSync(file)){
        fs.writeFile(file, '', function (err) {
            if (err) throw err;
        });
    }
    return file
}

async function writeLog(file, data) {
    if (!fs.existsSync(file)){
        await logPath(path, name);
    }
    fs.appendFile(file, data, function (err) {
        if (err) throw err;
    });
    return true
}


/**
 * The normal log function. For debug/status messages
 * @param {string} message The message to be logged
 * @param {string} func The name of the function that called this
 * @param {boolean} toLogFile Weather to log it to a file or not
 * @returns 
 */
async function consoleMessage(message, func, toLogFile) {
        let time = date.toTimeString().split(' ')[0];
        if (func == null) {var func = "main"}
        let message = func + "@" + time + ": " + message
        console.log(chalk.green(message))
        if (toLogFile) {
            writeLog(message, logPath())
        }
        return
}


/**
 * The error function. For any type of error
 * @param {string} message The message to be logged
 * @param {string} func The name of the function that called this
 * @param {boolean} toLogFile Weather to log it to a file or not
 * @returns 
 */
async function consoleError(message, func, toLogFile) {
    let time = date.toTimeString().split(' ')[0];
    if (func == null) {var func = "main"}
    let message = "ERROR from " + func + "@" + time + ": " + message
    console.log(chalk.red(message))
    if (toLogFile) {
        writeLog(message, logPath())
    }
    return
}

module.exports = {
    consoleError,
    consoleMessage
}