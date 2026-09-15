/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */

var maxPalindromes = function(s, k) {
    const n = s.length;

    // isPal[i][j] tells whether s[i...j] is a palindrome
    const isPal = Array.from({ length: n }, () => Array(n).fill(false));

    // Build palindrome table
    for (let i = n - 1; i >= 0; i--) {
        for (let j = i; j < n; j++) {
            if (
                s[i] === s[j] &&
                (j - i <= 2 || isPal[i + 1][j - 1])
            ) {
                isPal[i][j] = true;
            }
        }
    }

    // dp[i] = maximum number of valid palindromes
    // using the first i characters
    const dp = Array(n + 1).fill(0);

    for (let i = 1; i <= n; i++) {
        // Skip s[i - 1]
        dp[i] = dp[i - 1];

        // Try every palindrome ending at i - 1
        for (let j = 0; j < i; j++) {
            if (i - j >= k && isPal[j][i - 1]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }

    return dp[n];
};
