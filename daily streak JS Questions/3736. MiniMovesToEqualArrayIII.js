/**
 * @param {number[]} nums
 * @return {number}
 */
var minMoves = function(nums) {
    const maxVal = Math.max(...nums);
    let moves = 0;

    for (const num of nums) {
        moves += maxVal - num;
    }

    return moves;
};