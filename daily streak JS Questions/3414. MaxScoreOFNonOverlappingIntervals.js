/**
 * @param {number[][]} intervals
 * @return {number[]}
 */
var maximumWeight = function(intervals) {
    const n = intervals.length;

    // Keep original index
    const arr = intervals.map((interval, index) => [
        interval[0],
        interval[1],
        interval[2],
        index
    ]);

    // Sort by start time
    arr.sort((a, b) => {
        if (a[0] !== b[0]) return a[0] - b[0];
        return a[1] - b[1];
    });

    const starts = arr.map(interval => interval[0]);

    // Find first interval whose start > current end
    function findNext(end) {
        let left = 0;
        let right = n;

        while (left < right) {
            const mid = Math.floor((left + right) / 2);

            if (starts[mid] > end) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }

        return left;
    }

    // Compare two index arrays lexicographically
    function isSmaller(a, b) {
        if (b === null) return true;

        const len = Math.min(a.length, b.length);

        for (let i = 0; i < len; i++) {
            if (a[i] !== b[i]) {
                return a[i] < b[i];
            }
        }

        return a.length < b.length;
    }

    // dp[i][count] = best result from i onward
    const memo = new Map();

    function dfs(i, count) {
        if (i === n || count === 4) {
            return [0, []];
        }

        const key = i + "," + count;

        if (memo.has(key)) {
            return memo.get(key);
        }

        // Option 1: skip current interval
        const skip = dfs(i + 1, count);

        // Option 2: take current interval
        const next = findNext(arr[i][1]);
        const takeNext = dfs(next, count + 1);

        const takeScore = arr[i][2] + takeNext[0];
        const takeIndices = [arr[i][3], ...takeNext[1]];

        let best;

        if (takeScore > skip[0]) {
            best = [takeScore, takeIndices];
        } else if (takeScore < skip[0]) {
            best = skip;
        } else {
            // Same score → lexicographically smaller indices
            best = isSmaller(takeIndices, skip[1])
                ? [takeScore, takeIndices]
                : skip;
        }

        memo.set(key, best);
        return best;
    }

    return dfs(0, 0)[1].sort((a, b) => a - b);
};