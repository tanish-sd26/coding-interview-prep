/**
 * @param {number[][]} items
 * @param {number} budget
 * @return {number}
 */
var maximumSaleItems = function(items, budget) {
    const n = items.length;
    const dp = new Array(budget + 1).fill(0);
    let minPrice = Infinity;

    for (const [factor, price] of items) {
        minPrice = Math.min(minPrice, price);

        let count = 0;

        for (const [otherFactor] of items) {
            if (otherFactor % factor === 0) {
                count++;
            }
        }

        // First purchase of this item type: 0/1 knapsack
        for (let b = budget; b >= price; b--) {
            dp[b] = Math.max(dp[b], dp[b - price] + count);
        }
    }

    let answer = 0;

    // Use remaining budget to buy cheapest items
    for (let b = 0; b <= budget; b++) {
        const extra = Math.floor((budget - b) / minPrice);
        answer = Math.max(answer, dp[b] + extra);
    }

    return answer;
};