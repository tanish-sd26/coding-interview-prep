/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var minimumChanges = function(s, k) {
    const n = s.length;
    const INF = 1e9;

    // cost[l][r] = minimum changes to make s[l...r]
    // a semi-palindrome
    const cost = Array.from(
        { length: n },
        () => Array(n).fill(INF)
    );

    // Precompute minimum changes for every substring
    for (let l = 0; l < n; l++) {
        for (let r = l + 1; r < n; r++) {
            const len = r - l + 1;

            // Try every proper divisor of substring length
            for (let d = 1; d < len; d++) {
                if (len % d !== 0) continue;

                let changes = 0;

                // Check each group formed by positions
                // having the same remainder modulo d
                for (let offset = 0; offset < d; offset++) {
                    const count = len / d;

                    for (let p = 0; p < Math.floor(count / 2); p++) {
                        const left = l + offset + p * d;
                        const right = l + offset + (count - 1 - p) * d;

                        if (s[left] !== s[right]) {
                            changes++;
                        }
                    }
                }

                cost[l][r] = Math.min(cost[l][r], changes);
            }
        }
    }

    // dp[i][j] = minimum changes to partition
    // first i characters into j semi-palindromes
    const dp = Array.from(
        { length: k + 1 },
        () => Array(n + 1).fill(INF)
    );

    dp[0][0] = 0;

    for (let parts = 1; parts <= k; parts++) {
        for (let i = parts * 2; i <= n; i++) {
            // At least 2 characters must be left
            // for the current substring
            for (let j = (parts - 1) * 2; j <= i - 2; j++) {
                if (dp[parts - 1][j] === INF) continue;

                dp[parts][i] = Math.min(
                    dp[parts][i],
                    dp[parts - 1][j] + cost[j][i - 1]
                );
            }
        }
    }

    return dp[k][n];
};