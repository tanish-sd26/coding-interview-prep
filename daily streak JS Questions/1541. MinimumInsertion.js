/**
 * @param {string} s
 * @return {number}
 */
var minInsertions = function(s) {
    let open = 0;
    let insertions = 0;

    for (let i = 0; i < s.length; i++) {
        if (s[i] === "(") {
            open++;
        } else {
            // If this is the last ')' in a pair,
            // insert the missing ')'
            if (i + 1 < s.length && s[i + 1] === ")") {
                i++;
            } else {
                insertions++;
            }

            // These two ')' need a matching '('
            if (open > 0) {
                open--;
            } else {
                // Insert a missing '('
                insertions++;
            }
        }
    }

    // Every remaining '(' needs two ')'
    insertions += open * 2;

    return insertions;
};