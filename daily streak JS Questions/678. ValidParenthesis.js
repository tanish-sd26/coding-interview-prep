/**
 * @param {string} s
 * @return {boolean}
 */
var checkValidString = function(s) {
    let minBalance = 0;
    let maxBalance = 0;

    for (const ch of s) {
        if (ch === "(") {
            minBalance++;
            maxBalance++;
        } 
        else if (ch === ")") {
            minBalance--;
            maxBalance--;
        } 
        else {
            // '*' can be ')', '(' or empty
            minBalance--;
            maxBalance++;
        }

        // Even the maximum possible balance is negative
        if (maxBalance < 0) {
            return false;
        }

        // Negative minimum is not useful
        minBalance = Math.max(0, minBalance);
    }

    // We need balance 0 to be possible
    return minBalance === 0;
};