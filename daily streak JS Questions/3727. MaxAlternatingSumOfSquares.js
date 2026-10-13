/**
 * @param {number[]} nums
 * @return {number}
 */

var maxAlternatingSum = function(nums) {
    const squares = nums
        .map(num => num * num)
        .sort((a, b) => b - a);

    let score = 0;

    for (let i = 0; i < squares.length; i++) {
        if (i < Math.ceil(squares.length / 2)) {
            score += squares[i];
        } else {
            score -= squares[i];
        }
    }

    return score;
};
