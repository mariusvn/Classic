

/**
 * @typedef {Object} LinePattern
 * @property {String} name
 * @property {Function} handler
 * @property {Number} priority
 */

/**
 * List of all registered LinePatterns
 * @type {Array<LinePattern>}
 */
let linePatternList = [];

/**
 * list of all priority presents in the linePatternList
 * @type {Array<Number>}
 */
let priorityList = [];
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
    if (name.length <= 0 || name.length > 256 || priority <= 0 || priorityList.includes(priority))
        return undefined;
    let pattern = {
        name: name,
        handler: handler,
        priority: priority
    };
    priorityList.push(priority);
    linePatternList.push(pattern);
    return pattern;
}

/**
 * Handle the line with all LinePatterns
 * @param {String} line
 * @return {String} handled line
 */
function executeLine(line) {
    linePatternList.sort((x, y) => {
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

module.exports = {
    createLinePattern,
    executeLine
};