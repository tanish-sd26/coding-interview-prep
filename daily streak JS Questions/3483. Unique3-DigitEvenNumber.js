/**
 * @param {number[]} digits
 * @return {number}
 */
var totalNumbers = function(digits) {
    const count = new Array(10).fill(0);

    // Count how many times each digit is available
    for (const digit of digits) {
        count[digit]++;
    }

    const numbers = new Set();

    // Choose the hundreds digit
    for (let i = 1; i <= 9; i++) {
        if (count[i] === 0) continue;

        // Choose the tens digit
        for (let j = 0; j <= 9; j++) {
            if (count[j] === 0) continue;

            // Choose an even units digit
            for (let k = 0; k <= 8; k += 2) {
                if (count[k] === 0) continue;

                // Check if we have enough copies
                if (i === j && count[i] < 2) continue;
                if (i === k && count[i] < (i === j ? 3 : 2)) continue;
                if (j === k && i !== j && count[j] < 2) continue;

                const number = i * 100 + j * 10 + k;
                numbers.add(number);
            }
        }
    }

    return numbers.size;
}; 