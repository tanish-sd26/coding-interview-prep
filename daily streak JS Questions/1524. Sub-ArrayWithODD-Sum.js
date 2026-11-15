/**
 * @param {number[]} arr
 * @return {number}
 */

var numOfSubarrays = function(arr) {
    const MOD = 1e9 + 7;

    let even = 1;
    let odd = 0;
    let prefix = 0;
    let count = 0;

    for (let num of arr) {
        prefix += num;

        if (prefix % 2 === 0) {
            count += odd;
            even++;
        } else {
            count += even;
            odd++;
        }

        count %= MOD;
    }

    return count;
};

