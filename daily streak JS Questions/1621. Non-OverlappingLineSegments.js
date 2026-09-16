/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */

var numberOfSets = function(n, k) {
    const MOD = 1000000007n;
    const N = n + k - 1;

    const fact = new Array(N + 1);
    const invFact = new Array(N + 1);

    fact[0] = 1n;

    for (let i = 1; i <= N; i++) {
        fact[i] = fact[i - 1] * BigInt(i) % MOD;
    }

    invFact[N] = modPow(fact[N], MOD - 2n, MOD);

    for (let i = N - 1; i >= 0; i--) {
        invFact[i] = invFact[i + 1] * BigInt(i + 1) % MOD;
    }

    const r = 2 * k;

    return Number(
        fact[N] *
        invFact[r] % MOD *
        invFact[N - r] % MOD
    );
};

function modPow(base, exp, mod) {
    let result = 1n;

    while (exp > 0n) {
        if (exp % 2n === 1n) {
            result = result * base % mod;
        }

        base = base * base % mod;
        exp /= 2n;
    }

    return result;
}