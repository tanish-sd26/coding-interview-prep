/**
 * @param {number[]} nums
 * @return {number}
 */
var maxLength = function(nums) {
    const gcd = (a, b) => {
        while (b !== 0) {
            [a, b] = [b, a % b];
        }
        return a;
    };

    let maxLen = 1;

    for (let i = 0; i < nums.length; i++) {
        let product = 1;
        let g = 0;
        let l = 1;

        for (let j = i; j < nums.length; j++) {
            let num = nums[j];

            product *= num;
            g = gcd(g, num);
            l = (l * num) / gcd(l, num);

            if (product === g * l) {
                maxLen = Math.max(maxLen, j - i + 1);
            }
        }
    }

    return maxLen;
};