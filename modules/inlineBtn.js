const classic = require("../reader")(),
    tag = require("html5-tag");

let handler = function(line) {
    let regex = /\[(.{1,1024})]\((https?:\/\/.{1,1024})\)/;
    let match;
    while ((match = regex.exec(line)) != null) {
        let start = match.index;
        let end = match.index + match[0].length;
        let res = tag('a', {'href': match[2]}, match[1]);
        let before = line.slice(0, start);
        let after = line.slice(end);
        line = before + res + after;
    }
    return line;
};

module.exports = () => {
    classic.createLinePattern("inlineBtn", handler, 3);
};