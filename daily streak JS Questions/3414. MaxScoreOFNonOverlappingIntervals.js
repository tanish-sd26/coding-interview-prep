/**
 * @param {number[][]} intervals
 * @return {number[]}
 */
var maximumWeight = function(intervals) {
    const n = intervals.length;

    // Keep original index with every interval.
    const arr = intervals.map((x, i) => [x[0], x[1], x[2], i]);

    // Sort by ending position.
    arr.sort((a, b) => {
        if (a[1] !== b[1]) return a[1] - b[1];
        return a[0] - b[0];
    });

    // dp[i][cnt] = best answer using first i intervals
    // with at most cnt selected intervals.
    const dp = Array.from({ length: n + 1 }, () =>
        Array.from({ length: 5 }, () => null)
    );

    for (let cnt = 0; cnt <= 4; cnt++) {
        dp[0][cnt] = { score: 0, indices: [] };
    }

    // Binary search:
    // Find the last interval whose end < current interval's start.
    function findPrevious(i) {
        let left = 0;
        let right = i - 1;
        let ans = -1;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);

            if (arr[mid][1] < arr[i][0]) {
                ans = mid;
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return ans;
    }

    // Lexicographical comparison of index arrays.
    function smaller(a, b) {
        if (b === null) return true;

        const len = Math.min(a.length, b.length);

        for (let i = 0; i < len; i++) {
            if (a[i] !== b[i]) {
                return a[i] < b[i];
            }
        }

        return a.length < b.length;
    }

    // Compare two states:
    // 1. Higher score is better.
    // 2. If scores equal, lexicographically smaller indices are better.
    function better(a, b) {
        if (b === null) return a;

        if (a.score !== b.score) {
            return a.score > b.score ? a : b;
        }

        return smaller(a.indices, b.indices) ? a : b;
    }

    for (let i = 1; i <= n; i++) {
        const current = arr[i - 1];
        const originalIndex = current[3];

        const prev = findPrevious(i - 1);

        for (let cnt = 0; cnt <= 4; cnt++) {
            // Don't take current interval.
            let best = dp[i - 1][cnt];

            // Take current interval.
            if (cnt > 0) {
                const base = dp[prev + 1][cnt - 1];

                const indices = [...base.indices, originalIndex];

                // Final answer must be sorted by original index
                // because lexicographical comparison is on index arrays.
                indices.sort((a, b) => a - b);

                const take = {
                    score: base.score + current[2],
                    indices: indices
                };

                best = better(take, best);
            }

            dp[i][cnt] = best;
        }
    }

    // We can choose up to 4 intervals.
    let answer = dp[n][0];

    for (let cnt = 1; cnt <= 4; cnt++) {
        answer = better(dp[n][cnt], answer);
    }

    return answer.indices;
};