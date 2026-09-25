/**
 * @param {string} expression
 * @return {string[]}
 */
var braceExpansionII = function(expression) {
    let index = 0;

    // Combine two sets using concatenation
    function multiply(set1, set2) {
        const result = new Set();

        for (const a of set1) {
            for (const b of set2) {
                result.add(a + b);
            }
        }

        return result;
    }

    // Parse an expression:
    // term (, term)*
    function parseExpression() {
        let result = parseTerm();

        while (index < expression.length && expression[index] === ',') {
            index++; // skip ','

            const next = parseTerm();

            for (const word of next) {
                result.add(word);
            }
        }

        return result;
    }

    // Parse concatenated factors:
    // factor factor factor ...
    function parseTerm() {
        let result = new Set([""]);

        while (
            index < expression.length &&
            expression[index] !== '}' &&
            expression[index] !== ','
        ) {
            const current = parseFactor();

            result = multiply(result, current);
        }

        return result;
    }

    // Parse either:
    // - a single letter
    // - a {...} expression
    function parseFactor() {
        // Single character
        if (expression[index] !== '{') {
            const char = expression[index];
            index++;

            return new Set([char]);
        }

        // '{'
        index++;

        const result = parseExpression();

        // '}'
        index++;

        return result;
    }

    const result = [...parseExpression()];

    result.sort();

    return result;
};