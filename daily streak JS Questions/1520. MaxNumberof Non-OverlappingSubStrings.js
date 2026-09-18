/**
 * @param {string} s
 * @return {string[]}
 */
var maxNumOfSubstrings = function(s) {
    const n = s.length;

    // first[c] = first occurrence of character c
    // last[c] = last occurrence of character c
    const first = new Array(26).fill(n);
    const last = new Array(26).fill(-1);

    for (let i = 0; i < n; i++) {
        const c = s.charCodeAt(i) - 97;

        first[c] = Math.min(first[c], i);
        last[c] = i;
    }

    // Find the smallest valid interval starting at index l
    function getInterval(l) {
        const startChar = s.charCodeAt(l) - 97;

        let r = last[startChar];

        for (let i = l; i <= r; i++) {
            const c = s.charCodeAt(i) - 97;

            // This character occurs before l,
            // so we cannot create a valid substring starting at l.
            if (first[c] < l) {
                return null;
            }

            // We must include every occurrence of this character.
            r = Math.max(r, last[c]);
        }

        return [l, r];
    }

    const intervals = [];

    // Only first occurrences can start a minimal valid substring.
    for (let c = 0; c < 26; c++) {
        if (first[c] === n) continue;

        const interval = getInterval(first[c]);

        if (interval !== null) {
            intervals.push(interval);
        }
    }

    // Sort by ending position.
    intervals.sort((a, b) => a[1] - b[1]);

    const answer = [];
    let prevEnd = -1;

    for (const [start, end] of intervals) {
        if (start > prevEnd) {
            answer.push(s.slice(start, end + 1));
            prevEnd = end;
        }
    }

    return answer;
};