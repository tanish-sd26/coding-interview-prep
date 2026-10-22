/**
 * @param {number[]} nums
 * @return {number}
 */

var minOperations = function(nums) {
    const n = nums.length;
    const zero = nums.indexOf(0);

    function check(step) {
        for (let i = 1; i < n; i++) {
            const prev = (zero + (i - 1) * step + n * n) % n;
            const curr = (zero + i * step + n * n) % n;

            if (nums[prev] > nums[curr]) {
                return false;
            }
        }
        return true;
    }

    let ans = Infinity;

    if (check(1)) {
        ans = Math.min(ans, zero);
        ans = Math.min(ans, n - zero + 2);
    }

    if (check(-1)) {
        ans = Math.min(ans, zero + 2);
        ans = Math.min(ans, n - zero);
    }

    return ans === Infinity ? -1 : ans;
};
