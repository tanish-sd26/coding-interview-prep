/**
 * @param {number} cost1
 * @param {number} cost2
 * @param {number} costBoth
 * @param {number} need1
 * @param {number} need2
 * @return {number}
 */
var minimumCost = function(cost1, cost2, costBoth, need1, need2) {
    const option1 = need1 * cost1 + need2 * cost2;

    const both = Math.min(need1, need2);

    const option2 =
        both * costBoth +
        (need1 - both) * cost1 +
        (need2 - both) * cost2;

    const option3 = Math.max(need1, need2) * costBoth;

    return Math.min(option1, option2, option3);
};