const classic = require("../reader")(),
    tag = require("html5-tag");

let handler = function(file) {
    let regex = /(\n{2,})/;
    let match = regex.exec(file);
    let brNum = 1;
    if (match[1].length === 3)
        brNum = 2;
    let res = "";
    for (let i = 0; i < brNum; i++) {
        res += tag('br', {})
    }
    return res;
};

module.exports = () => {
    classic.createMultiLinePattern("br", /\n{2,}/g, handler, 2);
};