/**
 * @param {string} s
 * @return {number}
 */
var distinctSubseqII = function(s) {
    const MOD = 1000000007;

    let dp = 1; // Empty subsequence

    const last = new Array(26).fill(0);

    for (let ch of s) {
        const index = ch.charCodeAt(0) - 97;

        const newDp = (2 * dp - last[index] + MOD) % MOD;

        last[index] = dp;
        dp = newDp;
    }

    return (dp - 1 + MOD) % MOD;
};