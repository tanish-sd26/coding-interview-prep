/**
 * @param {number[]} nums
 * @param {number} x
 * @param {number} k
 * @return {number}
 */
var minOperations = function(nums, x, k) {
    const n = nums.length;
    const INF = Number.MAX_SAFE_INTEGER;

    // Coordinate compression
    const sorted = [...new Set(nums)].sort((a, b) => a - b);
    const m = sorted.length;

    const rank = new Map();
    for (let i = 0; i < m; i++) {
        rank.set(sorted[i], i + 1);
    }

    // Fenwick Trees: frequency and sum
    const countBIT = new Array(m + 1).fill(0);
    const sumBIT = new Array(m + 1).fill(0);

    function update(bit, index, delta) {
        while (index <= m) {
            bit[index] += delta;
            index += index & -index;
        }
    }

    function query(bit, index) {
        let result = 0;

        while (index > 0) {
            result += bit[index];
            index -= index & -index;
        }

        return result;
    }

    // Find the index of the kth smallest element
    function kth(kthValue) {
        let index = 0;
        let step = 1;

        while (step * 2 <= m) {
            step *= 2;
        }

        for (; step > 0; step >>= 1) {
            const next = index + step;

            if (next <= m && countBIT[next] < kthValue) {
                kthValue -= countBIT[next];
                index = next;
            }
        }

        return index + 1;
    }

    function add(value, delta) {
        const index = rank.get(value);

        update(countBIT, index, delta);
        update(sumBIT, index, value * delta);
    }

    // Cost of making the current window equal
    function getWindowCost() {
        const medianIndex = kth(Math.ceil(x / 2));
        const median = sorted[medianIndex - 1];

        const leftCount = query(countBIT, medianIndex);
        const leftSum = query(sumBIT, medianIndex);

        const totalSum = query(sumBIT, m);
        const rightCount = x - leftCount;
        const rightSum = totalSum - leftSum;

        return (
            median * leftCount - leftSum +
            rightSum - median * rightCount
        );
    }

    // Calculate cost for every window of size x
    const windowCount = n - x + 1;
    const costs = new Array(windowCount);

    for (let i = 0; i < x; i++) {
        add(nums[i], 1);
    }

    for (let start = 0; start < windowCount; start++) {
        costs[start] = getWindowCost();

        if (start + x < n) {
            add(nums[start], -1);
            add(nums[start + x], 1);
        }
    }

    // dp[i][j] = minimum cost to choose j non-overlapping
    // windows from nums[i...n-1]
    const dp = Array.from(
        { length: n + 1 },
        () => new Array(k + 1).fill(INF)
    );

    for (let i = 0; i <= n; i++) {
        dp[i][0] = 0;
    }

    for (let j = 1; j <= k; j++) {
        for (let i = n - 1; i >= 0; i--) {
            // Option 1: Skip index i
            dp[i][j] = dp[i + 1][j];

            // Option 2: Choose window starting at i
            if (i + x <= n) {
                const take = costs[i] + dp[i + x][j - 1];

                dp[i][j] = Math.min(dp[i][j], take);
            }
        }
    }

    return dp[0][k];
};