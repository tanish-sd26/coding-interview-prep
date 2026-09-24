/**
 * @param {number[]} nums
 * @return {number}
 */
var smallestIndex = function(nums) {
    for (let i = 0; i < nums.length; i++) {
        let num = nums[i];
        let digitSum = 0;

        while (num > 0) {
            digitSum += num % 10;
            num = Math.floor(num / 10);
        }

        if (digitSum === i) {
            return i;
        }
    }

    return -1;
};