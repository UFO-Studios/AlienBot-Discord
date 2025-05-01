const fs = require('node:fs');

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
        let date = new Date();
        let time = date.toTimeString().split(' ')[0];
        if (func == null) {var func = "main"}
        let messageOut = func + "@" + time + ": " + message
        console.log(messageOut)
        if (toLogFile) {
            writeLog(messageOut, logPath())
        }
        return
}


/**
 * The error function. For any type of error
 * @param {string} message The message to be logged
 * @param {string} func The name of the function that called this
 * @param {boolean} toLogFile Weather to log it to a file or not
 * @param {boolean} fatal Weather to exit the program or not
 * @returns 
 */
async function consoleError(message, func, toLogFile, fatal=false) {
    let date = new Date();
    let time = date.toTimeString().split(' ')[0];
    if (func == null) {var func = "main"}
    let messageOut = "ERROR from " + func + "@" + time + ": " + message
    console.log(messageOut)
    if (toLogFile) {
        writeLog(messageOut, logPath())
    }
    return
}

export default {
    consoleError,
    consoleMessage
}