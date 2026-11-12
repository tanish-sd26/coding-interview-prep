/**
 * @param {number[]} nums
 * @return {number}
 */
var longestMonotonicSubarray = function(nums) {
    let increasing = 1;
    let decreasing = 1;
    let answer = 1;

    for (let i = 1; i < nums.length; i++) {
        if (nums[i] > nums[i - 1]) {
            increasing++;
            decreasing = 1;
        } 
        else if (nums[i] < nums[i - 1]) {
            decreasing++;
            increasing = 1;
        } 
        else {
            increasing = 1;
            decreasing = 1;
        }

        answer = Math.max(answer, increasing, decreasing);
    }

    return answer;
};