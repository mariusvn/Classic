const classic = require("../reader")(),
    tag = require("html5-tag");

let handler = function(line) {
    let regex = /^\W*---.*/;
    let match = line.match(regex);
    if (match)
        line = tag('hr', {});
    return line;
};

module.exports = () => {
    classic.createLinePattern("line", handler, 2);
};