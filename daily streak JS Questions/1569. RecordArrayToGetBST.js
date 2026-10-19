/**
 * @param {number[]} nums
 * @return {number}
 */

var numOfWays = function(nums) {
    const MOD = 1000000007n;
    const n = nums.length;

    const fact = Array(n + 1).fill(1n);
    const invFact = Array(n + 1).fill(1n);

    function modPow(base, exp) {
        let result = 1n;

        while (exp > 0n) {
            if (exp % 2n === 1n) {
                result = result * base % MOD;
            }

            base = base * base % MOD;
            exp /= 2n;
        }

        return result;
    }

    for (let i = 1; i <= n; i++) {
        fact[i] = fact[i - 1] * BigInt(i) % MOD;
    }

    invFact[n] = modPow(fact[n], MOD - 2n);

    for (let i = n; i >= 1; i--) {
        invFact[i - 1] = invFact[i] * BigInt(i) % MOD;
    }

    function comb(total, choose) {
        return fact[total] * invFact[choose] % MOD
            * invFact[total - choose] % MOD;
    }

    function countWays(arr) {
        if (arr.length <= 2) return 1n;

        const root = arr[0];
        const left = [];
        const right = [];

        for (let i = 1; i < arr.length; i++) {
            if (arr[i] < root) {
                left.push(arr[i]);
            } else {
                right.push(arr[i]);
            }
        }

        const leftWays = countWays(left);
        const rightWays = countWays(right);

        const interleavings = comb(
            left.length + right.length,
            left.length
        );

        return interleavings * leftWays % MOD * rightWays % MOD;
    }

    return Number((countWays(nums) - 1n + MOD) % MOD);
};
