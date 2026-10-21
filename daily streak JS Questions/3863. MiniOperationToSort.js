/**
 * @param {string} s
 * @return {number}
 */

var minOperations = function(s) {
    const n = s.length;
    let sorted = true;
    let mn = s[0];
    let mx = s[0];

    for (let i = 1; i < n; i++) {
        if (s[i] < s[i - 1]) {
            sorted = false;
        }

        mn = s[i] < mn ? s[i] : mn;
        mx = s[i] > mx ? s[i] : mx;
    }

    if (sorted) return 0;
    if (n === 2) return -1;

    if (s[0] === mn || s[n - 1] === mx) {
        return 1;
    }

    for (let i = 1; i < n - 1; i++) {
        if (s[i] === mn || s[i] === mx) {
            return 2;
        }
    }

    return 3;
};
