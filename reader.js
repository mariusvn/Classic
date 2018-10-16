const pattern = require("./pattern"),
    fs = require('fs');

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
    return newLines.join('\n');
}

module.exports = {
    read,
    readFile,
    createLinePattern: pattern.createLinePattern
};