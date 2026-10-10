/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k1
 * @param {number} k2
 * @return {number}
 */

function minSumSquareDiff(nums1, nums2, k1, k2) {
    const n = nums1.length;
    const k = k1 + k2;

    const diff = [];

    for (let i = 0; i < n; i++) {
        diff.push(Math.abs(nums1[i] - nums2[i]));
    }

    const totalDiff = diff.reduce((sum, d) => sum + d, 0);

    if (k >= totalDiff) {
        return 0;
    }

    let left = 0;
    let right = Math.max(...diff);

    while (left < right) {
        const mid = Math.floor((left + right) / 2);

        let needed = 0;

        for (const d of diff) {
            needed += Math.max(0, d - mid);
        }

        if (needed <= k) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }

    const limit = left;
    let used = 0;
    let answer = 0;

    for (const d of diff) {
        const reduced = Math.min(d, limit);

        used += d - reduced;
        answer += reduced * reduced;
    }

    let remaining = k - used;

    answer -= remaining * (2 * limit - 1);

    return answer;
}