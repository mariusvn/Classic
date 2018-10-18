const classic = require("../reader")(),
    tag = require("html5-tag");

let underline = function(file) {
    let regex = /--(.*?)--/;
    let match = regex.exec(file);
    return tag('u', {}, match[1]);
};

let bold = function(file) {
    let regex = /\*\*(.*?)\*\*/;
    let match = regex.exec(file);
    return tag('b', {}, match[1]);
};

module.exports = () => {
    classic.createMultiLinePattern("underline", /--(.*?)--/g, underline, 3);
    classic.createMultiLinePattern("bold", /\*\*(.*?)\*\*/g, bold, 4);
};