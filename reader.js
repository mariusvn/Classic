const pattern = require("./pattern"),
    fs = require('fs');

let isStarted = false;

/**
 * read a file and return html string
 * @param {String} filepath
 * @return {String}
 */
function readFile(filepath) {
    let file;
    try {
        file = fs.readFileSync(filepath).toString();
    } catch (e) {
        throw `Error while reading the file "${filepath}"`;
    }
    return read(file);
}

/**
 * read a string and return html string
 * @param {String} str
 * @return {String}
 */
function read(str) {
    let lines = str.split('\n');
    let newLines = [];
    for (let i = 0, len = lines.length; i < len; i++)
        newLines.push(pattern.executeLine(lines[i]));
    let html = newLines.join('\n');
    return pattern.executeMultiLine(html);
}

let expor = {
    read,
    readFile,
    createLinePattern: pattern.createLinePattern,
    createMultiLinePattern: pattern.createMultiLinePattern
};

function init() {
    if (isStarted)
        return expor;
    isStarted = true;
    try {
        let item = fs.readdirSync('modules');
        item = item.map((val) => {
            if (val.endsWith(".js"))
                return val;
            return undefined;
        });
        item = item.filter(function (el) {return el != null;}); // remove undefined
        for (let i = 0, len = item.length; i < len; i++) {
            require('./modules/' + item[i].slice(0, -3))();
        }
    } catch (e) {
        throw "[classic] 'modules' directory not found " + e;
    }
    return expor;
}

module.exports = init;