

/**
 * @typedef {Object} LinePattern
 * @property {String} name
 * @property {Function} handler
 * @property {Number} priority
 */


/**
 * @typedef {Object} MultiLinePattern
 * @property {String} name
 * @property {RegExp} regex
 * @property {Number} priority
 * @property {Function} handler // param : str de l'endroit
 */


/**
 * List of all registered LinePatterns
 * @type {Array<LinePattern>}
 */
let linePatternList = [];

/**
 * List of all registered MultiLinePatterns
 * @type {Array<MultiLinePattern>}
 */
let multiLinePatternList = [];


/**
 * list of all priority presents in the linePatternList
 * @type {Array<Number>}
 */
let priorityLineList = [];

/**
 * list of all priority presents in the multiLinePatternList
 * @type {Array<Number>}
 */
let priorityMultiLineList = [];

/**
 * Create a LinePattern.
 * @param {String} name size from 1 to 256
 * @param {Function} handler
 * @param {Number} priority 0 minimum
 * @return {LinePattern} undefined if requirement not match (if priority is already selected by another pattern,
 * returns undefined)
 */
function createLinePattern(name, handler, priority) {
    if (!name || !handler || priority === undefined)
        return undefined;
    if (name.length <= 0 || name.length > 256 || priority <= 0 || priorityLineList.includes(priority))
        return undefined;
    let pattern = {
        name: name,
        handler: handler,
        priority: priority
    };
    priorityLineList.push(priority);
    linePatternList.push(pattern);
    return pattern;
}

/**
 * Create a MultiLinePattern.
 * @param {String} name size from 1 to 256
 * @param {RegExp} regex
 * @param {Function} handler
 * @param {Number} priority 0 minimum
 * @return {MultiLinePattern} undefined if requirement not match (if priority is already selected by another pattern,
 * returns undefined)
 */
function createMultiLinePattern(name, regex, handler, priority) {
    if (!name || !handler || priority === undefined || !regex)
        return undefined;
    if (name.length <= 0 || name.length > 256 || priority <= 0 || priorityMultiLineList.includes(priority))
        return undefined;
    let pattern = {
        name: name,
        handler: handler,
        priority: priority,
        regex : regex
    };
    priorityMultiLineList.push(priority);
    multiLinePatternList.push(pattern);
    return pattern;
}


/**
 * Handle the line with all LinePatterns
 * @param {String} line
 * @return {String} handled line
 */
function executeLine(line) {
    linePatternList = linePatternList.sort((x, y) => {
        if (x.priority < y.priority)
            return -1;
        else if (x.priority > y.priority)
            return 1;
        else
            return 0;
    });
    for (let i = 0, len = linePatternList.length; i < len; i++) {
        line = linePatternList[i].handler(line);
    }
    return line;
}

/**
 * Handle the file with the MultiLinesPatterns
 * @param {String} file
 * @return {String} handled file
 */
function executeMultiLine(file) {
    multiLinePatternList = multiLinePatternList.sort((x, y) => {
        if (x.priority < y.priority)
            return -1;
        else if (x.priority > y.priority)
            return 1;
        else
            return 0;
    });
    for (let i = 0, len = multiLinePatternList.length; i < len; i++) {
        let pattern = multiLinePatternList[i];
        let match;
        while ((match = pattern.regex.exec(file)) !== null) {
            if (!match)
                continue;
            let from = match.index;
            let to = match.index + match[0].length;
            let res = pattern.handler(match[0]);
            let before = file.slice(0, from);
            let after = file.slice(to);
            file = before + res + after;
        }
    }
    return file;
}


module.exports = {
    createLinePattern,
    createMultiLinePattern,
    executeLine,
    executeMultiLine
};