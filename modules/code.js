const classic = require("../reader")(),
    tag = require("html5-tag");

let handler = function(file) {
    let regex = /```\n(.*)\n```/;
    let match = regex.exec(file);
    return tag('code', {}, match[1]);
};

module.exports = () => {
    classic.createMultiLinePattern("code", /```\n.*\n```/g, handler, 1);
};