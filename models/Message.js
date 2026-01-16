const outputMessages = require("../utils/const/outputMessages.json");

/**
 * Gets a random output message
 *
 * @param {number} [index=-1] Index (optional, -1 if void, -1 for random)
 * @returns {string} Output message
 */
function getRandomOutputMessage(index = -1) {
    let i = index;
    if(index === -1) {
        i = Math.floor(Math.random() * outputMessages.length);
    }
    const output = outputMessages[i];
    return output;
}

/**
 * Gets the total amount of output messages
 *
 * @returns {number} Amount of output messages
 */
function getTotalOutputMessages() {
    return outputMessages.length;
}

exports.getRandomOutputMessage = getRandomOutputMessage;
exports.getTotalOutputMessages = getTotalOutputMessages;