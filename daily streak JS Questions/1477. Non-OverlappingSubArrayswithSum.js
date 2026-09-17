/**
 * @param {number[]} arr
 * @param {number} target
 * @return {number}
 */
var minSumOfLengths = function(arr, target) {
    const n = arr.length;

    // best[i] = minimum length of a target-sum subarray
    // ending at or before index i
    const best = new Array(n).fill(Infinity);

    let left = 0;
    let sum = 0;

    let answer = Infinity;
    let bestLength = Infinity;

    for (let right = 0; right < n; right++) {
        sum += arr[right];

        // Since all numbers are positive,
        // shrink the window if sum becomes too large.
        while (sum > target) {
            sum -= arr[left];
            left++;
        }

        // We found a subarray with sum = target
        if (sum === target) {
            const length = right - left + 1;

            // Check if there is a previous non-overlapping
            // target-sum subarray.
            if (left > 0 && best[left - 1] !== Infinity) {
                answer = Math.min(
                    answer,
                    length + best[left - 1]
                );
            }

            // Keep the shortest target-sum subarray seen so far.
            bestLength = Math.min(bestLength, length);
        }

        // Carry forward the best answer up to this index.
        best[right] = bestLength;
    }

    return answer === Infinity ? -1 : answer;
};