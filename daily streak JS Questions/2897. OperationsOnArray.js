/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */

var maxSum = function(nums, k) {
    const MOD = 1000000007n;
    const bitCount = Array(31).fill(0);

    // Count how many numbers contain each set bit
    for (const num of nums) {
        for (let bit = 0; bit < 31; bit++) {
            if ((num & (1 << bit)) !== 0) {
                bitCount[bit]++;
            }
        }
    }

    let answer = 0n;

    // Build k numbers greedily
    for (let i = 0; i < k; i++) {
        let num = 0;

        for (let bit = 0; bit < 31; bit++) {
            if (bitCount[bit] > 0) {
                num |= (1 << bit);
                bitCount[bit]--;
            }
        }

        const value = BigInt(num);
        answer = (answer + value * value) % MOD;
    }

    return Number(answer);
};
