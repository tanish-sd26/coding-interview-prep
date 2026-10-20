/**
 * @param {number[]} nums
 * @return {number}
 */

var sortableIntegers = function(nums) {
    const n = nums.length;

    // 1. Prefix maximum
    const prefMax = Array(n + 1).fill(0);

    for (let i = 0; i < n; i++) {
        prefMax[i + 1] = Math.max(prefMax[i], nums[i]);
    }

    // 2. Suffix minimum
    const suffMin = Array(n + 1).fill(Infinity);

    for (let i = n - 1; i >= 0; i--) {
        suffMin[i] = Math.min(nums[i], suffMin[i + 1]);
    }

    // 3. Prefix count of adjacent descents
    const prefDrop = Array(n).fill(0);

    for (let i = 1; i < n; i++) {
        prefDrop[i] =
            prefDrop[i - 1] + (nums[i - 1] > nums[i] ? 1 : 0);
    }

    // 4. Check whether block size k is sortable
    function check(k) {
        for (let start = 0; start < n; start += k) {
            const end = start + k - 1;

            let drops = prefDrop[end] - prefDrop[start];

            // Include the circular edge: last -> first
            if (nums[end] > nums[start]) {
                drops++;
            }

            // Block must be rotatable into sorted order
            if (drops > 1) {
                return false;
            }

            // Earlier blocks must not contain larger elements
            // than elements in the remaining suffix
            if (prefMax[start] > suffMin[start]) {
                return false;
            }
        }

        return true;
    }

    // 5. Enumerate divisors of n
    let answer = 0;

    for (let k = 1; k <= Math.floor(n / k); k++) {
        if (n % k === 0) {
            if (check(k)) {
                answer += k;
            }

            const other = n / k;

            if (other !== k && check(other)) {
                answer += other;
            }
        }
    }

    return answer;
};
