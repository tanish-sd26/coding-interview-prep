/**
 * @param {number[][]} items
 * @param {number} budget
 * @return {number}
 */
var maximumSaleItems = function(items, budget) {
    const n = items.length;
    const freq = new Array(n + 1).fill(0);

    let minPrice = Infinity;
    let maxFactor = 0;

    for (const [factor, price] of items) {
        freq[factor]++;
        minPrice = Math.min(minPrice, price);
        maxFactor = Math.max(maxFactor, factor);
    }

    // Count all items whose factors are divisible by each factor
    const gain = new Array(maxFactor + 1).fill(0);

    for (let f = 1; f <= maxFactor; f++) {
        for (let multiple = f; multiple <= maxFactor; multiple += f) {
            gain[f] += freq[multiple];
        }

        // Exclude the item itself
        if (gain[f] > 0) {
            gain[f]--;
        }
    }

    // Collect profitable boosted purchases
    const deals = [];

    for (const [factor, price] of items) {
        if (gain[factor] > 0 && price < 2 * minPrice) {
            deals.push([price, gain[factor]]);
        }
    }

    // Cheapest boosted purchases first
    deals.sort((a, b) => a[0] - b[0]);

    let answer = 0;

    for (const [price, count] of deals) {
        if (budget < price) break;

        const buy = Math.min(count, Math.floor(budget / price));

        answer += buy * 2;
        budget -= buy * price;
    }

    // Spend remaining budget on cheapest ordinary purchases
    answer += Math.floor(budget / minPrice);

    return answer;
};