/**
 * @param {string} s
 * @return {number}
 */
var minOperations = function(s) {
    const sorted = s.split('').sort().join('');

    if (s === sorted) return 0;

    const n = s.length;

    if (n === 2) return -1;

    if (s[0] === sorted[0] || s[n - 1] === sorted[n - 1]) {
        return 1;
    }

    if (s[0] === sorted[n - 1] && s[n - 1] === sorted[0]) {
        return 3;
    }

    return 2;
};