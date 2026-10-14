/**
 * @param {number} num
 * @param {number} sum
 * @return {string}
 */

var maxSumOfSquares = function(num, sum) {
    if (sum < 1 || sum > 9 * num) return "";

    let result = "";

    while (num > 0) {
        const digit = Math.min(9, sum);
        result += digit;
        sum -= digit;
        num--;
    }

    return sum === 0 ? result : "";
};
