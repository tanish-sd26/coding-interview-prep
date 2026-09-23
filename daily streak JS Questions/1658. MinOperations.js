/**
 * @param {number[]} nums
 * @param {number} x
 * @return {number}
 */
var minOperations = function(nums, x) {
    const n = nums.length;

    let total = 0;

    for (const num of nums) {
        total += num;
    }

    const target = total - x;

    // Need to remove the entire array
    if (target === 0) {
        return n;
    }

    // Impossible
    if (target < 0) {
        return -1;
    }

    let left = 0;
    let sum = 0;
    let maxLength = -1;

    for (let right = 0; right < n; right++) {
        sum += nums[right];

        while (sum > target && left <= right) {
            sum -= nums[left];
            left++;
        }

        if (sum === target) {
            maxLength = Math.max(
                maxLength,
                right - left + 1
            );
        }
    }

    return maxLength === -1
        ? -1
        : n - maxLength;
};