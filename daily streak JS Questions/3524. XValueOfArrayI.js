/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var resultArray = function(nums, k) {
     const answer = new Array(k).fill(0);
       // dp[r] = current position par end hone wale
    // subarrays jinka product % k = r
    let dp = new Array(k).fill(0);

    for (const num of nums) {
        const rem = num % k;

        const newDp = new Array(k).fill(0);

        // New subarray: [num]
        newDp[rem]++;

        // Previous subarrays ko current num se extend karo
        for (let r = 0; r < k; r++) {
            if (dp[r] === 0) continue;

            const newRem = (r * rem) % k;
            newDp[newRem] += dp[r];
        }

        // Current position ke saare subarrays ka count answer mein add karo
        for (let r = 0; r < k; r++) {
            answer[r] += newDp[r];
        }

        dp = newDp;
    }

    return answer;
   
};