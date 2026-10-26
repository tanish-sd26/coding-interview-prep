/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number}
 */

var countIslans = function(grid,k) {
    const m = grid.length;
    const n = grid[0].length;
    let count = 0;

    function dfs(r,c) {
        if ( r < 0 || r >= m || c < 0 || c >= n || grid [r][c] === 0) {
            return 0;
        }

        const value = grid[r][c];
        grid[r][c] = 0;

        return value + dfs(r - 1,c) +
               dfs(r + 1,c) +
               dfs(r,c - 1) +
               dfs(r,c + 1);

    }

       for (let r = 0; r < m; r++) {
        for (let c =0; c < n; c++) {
            if (grid[r][c] !== 0) {
                const sum = dfs(r, c);
                if (sum >= k) {
                    count++;
                }
            }
        }
       }

    return count;
};