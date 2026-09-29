/**
 * @param {character[][]} grid
 * @return {boolean}
 */
var hasValidPath = function(grid) {
    const m = grid.length;
    const n = grid[0].length;

    // A valid parentheses string must have even length
    if ((m + n - 1) % 2 !== 0) {
        return false;
    }

    // First character must be '('
    if (grid[0][0] === ')') {
        return false;
    }

    // Last character must be ')'
    if (grid[m - 1][n - 1] === '(') {
        return false;
    }

    const maxLen = m + n - 1;

    // dp[r][c][balance]
    const dp = Array.from({ length: m }, () =>
        Array.from({ length: n }, () =>
            new Uint8Array(maxLen + 1)
        )
    );

    // Starting cell
    dp[0][0][1] = 1;

    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {

            // Starting cell is already initialized
            if (r === 0 && c === 0) continue;

            const change = grid[r][c] === '(' ? 1 : -1;

            for (let balance = 0; balance <= maxLen; balance++) {
                if (r > 0 && dp[r - 1][c][balance]) {
                    const newBalance = balance + change;

                    if (newBalance >= 0) {
                        dp[r][c][newBalance] = 1;
                    }
                }

                if (c > 0 && dp[r][c - 1][balance]) {
                    const newBalance = balance + change;

                    if (newBalance >= 0) {
                        dp[r][c][newBalance] = 1;
                    }
                }
            }
        }
    }

    // Valid parentheses string must finish with balance 0
    return dp[m - 1][n - 1][0] === 1;
};