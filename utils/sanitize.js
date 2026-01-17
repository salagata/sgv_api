
/**
 * Removes extra spaces, and trims 
 *
 * @param {string} string A string
 * @returns {string} 
 */
function sanitize(string) {
    return string.trim().replaceAll(/\s+/g," ");
}

module.exports = { sanitize }