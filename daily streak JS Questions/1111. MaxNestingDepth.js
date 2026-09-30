/**
 * @param {string} seq
 * @return {number[]}
 */
var maxDepthAfterSplit = function(seq) {
    const answer = [];
    let depth = 0;

    for (const ch of seq) {
        if (ch === "(") {
            depth++;
            answer.push(depth % 2);
        } else {
            answer.push(depth % 2);
            depth--;
        }
    }

    return answer;
};