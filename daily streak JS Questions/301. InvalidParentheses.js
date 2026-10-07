/**
 * @param {string} s
 * @return {string[]}
 */
var removeInvalidParentheses = function(s) {
    function isValid(str) {
        let balance = 0;

        for (const ch of str) {
            if (ch === "(") {
                balance++;
            } else if (ch === ")") {
                balance--;

                if (balance < 0) {
                    return false;
                }
            }
        }

        return balance === 0;
    }

    const result = [];
    const visited = new Set([s]);
    let queue = [s];
    let found = false;

    while (queue.length > 0 && !found) {
        const nextQueue = [];

        for (const current of queue) {
            if (isValid(current)) {
                result.push(current);
                found = true;
                continue;
            }

            if (found) continue;

            for (let i = 0; i < current.length; i++) {
                // Only parentheses can be removed
                if (
                    current[i] !== "(" &&
                    current[i] !== ")"
                ) {
                    continue;
                }

                // Avoid removing identical consecutive parentheses
                if (
                    i > 0 &&
                    current[i] === current[i - 1]
                ) {
                    continue;
                }

                const next =
                    current.slice(0, i) +
                    current.slice(i + 1);

                if (!visited.has(next)) {
                    visited.add(next);
                    nextQueue.push(next);
                }
            }
        }

        queue = nextQueue;
    }

    return result;
};