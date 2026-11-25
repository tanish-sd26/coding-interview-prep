/**
 * @param {number[]} nums
 * @return {number}
 */
var smallestUniqueSubarray = function(nums) {
    const n = nums.length;

    const BASE1 = 100019;
    const BASE2 = 100043;
    const MOD1 = 1000000007;
    const MOD2 = 1000000009;

    const check = (len) => {
        let pow1 = 1;
        let pow2 = 1;

        for (let i = 0; i < len; i++) {
            pow1 = (pow1 * BASE1) % MOD1;
            pow2 = (pow2 * BASE2) % MOD2;
        }

        let h1 = 0;
        let h2 = 0;

        for (let i = 0; i < len; i++) {
            h1 = (h1 * BASE1 + nums[i]) % MOD1;
            h2 = (h2 * BASE2 + nums[i]) % MOD2;
        }

        const map = new Map();
        map.set(h1 + "," + h2, 1);

        for (let i = len; i < n; i++) {
            h1 = (h1 * BASE1 - nums[i - len] * pow1 + nums[i]) % MOD1;
            h2 = (h2 * BASE2 - nums[i - len] * pow2 + nums[i]) % MOD2;

            if (h1 < 0) h1 += MOD1;
            if (h2 < 0) h2 += MOD2;

            const key = h1 + "," + h2;
            map.set(key, (map.get(key) || 0) + 1);
        }

        for (const count of map.values()) {
            if (count === 1) return true;
        }

        return false;
    };

    let left = 1;
    let right = n;

    while (left < right) {
        const mid = left + Math.floor((right - left) / 2);

        if (check(mid)) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }

    return left;
};