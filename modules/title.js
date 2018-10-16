const classic = require("../reader")(),
    tag = require("html5-tag");

let handler = function(line) {
    let regex = /^(#{1,4}) (.*)$/;
    let match = line.match(regex);
    if (match)
        line = tag('h' + match[1].length, {}, match[2]);
    return line;
};

module.exports = () => {
    classic.createLinePattern("title", handler, 1);
};