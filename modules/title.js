const classic = require("../reader")(),
    tag = require("html5-tag");

let handler = function(line) {
    let regex = /^(#{1,4}) (.*)$/;
    let match = line.match(regex);
    if (match) {
        line = tag('h' + match[1].length, {}, match[2]);
        if (match[1].length === 1)
            line += tag('hr', {});
        line = tag('div', {class: "title-underline"}, line);
    }
    return line;
};

module.exports = () => {
    classic.createLinePattern("title", handler, 1);
};