/**
 * @param {number} n
 * @return {number}
 */
var countCommas = function(n) {
    let count = 0;
    let power = 1000;

    while (power <= n) {
        count += n - power + 1;
        power *= 1000;
    }

    return count;
};