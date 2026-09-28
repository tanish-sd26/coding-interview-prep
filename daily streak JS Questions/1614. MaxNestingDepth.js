/**
 * @param {string} s
 * @return {number}
 */
var maxDepth = function(s) {
    let depth = 0;
    let answer = 0;

    for (const ch of s) {
        if (ch === "(") {
            depth++;
            answer = Math.max(answer, depth);
        } else if (ch === ")") {
            depth--;
        }
    }

    return answer;
};