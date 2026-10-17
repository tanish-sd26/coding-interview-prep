/**
 * @param {number[]} nums
 * @return {number}
 */

var minSwaps = function(nums) {
    function digitSum(num) {
        let sum = 0;

        while (num > 0) {
            sum += num % 10;
            num = Math.floor(num / 10);
        }

        return sum;
    }

    const sorted = nums
        .map((num, index) => ({
            num,
            index,
            sum: digitSum(num)
        }))
        .sort((a, b) => a.sum - b.sum || a.num - b.num);

    const visited = Array(nums.length).fill(false);
    let swaps = 0;

    for (let i = 0; i < sorted.length; i++) {
        if (visited[i] || sorted[i].index === i) {
            continue;
        }

        let cycleLength = 0;
        let j = i;

        while (!visited[j]) {
            visited[j] = true;
            j = sorted[j].index;
            cycleLength++;
        }

        if (cycleLength > 1) {
            swaps += cycleLength - 1;
        }
    }

    return swaps;
};
