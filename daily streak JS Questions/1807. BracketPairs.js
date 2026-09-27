/**
 * @param {string} s
 * @param {string[][]} knowledge
 * @return {string}
 */
var evaluate = function(s, knowledge) {
    
    const map = new Map();

    // Store key-value pairs
    for (const [key, value] of knowledge) {
        map.set(key, value);
    }

    const result = [];

    let i = 0;

    while (i < s.length) {

        // Normal character
        if (s[i] !== '(') {
            result.push(s[i]);
            i++;
            continue;
        }

        // Skip '('
        i++;

        let key = "";

        // Read key until ')'
        while (s[i] !== ')') {
            key += s[i];
            i++;
        }

        // Add value or '?'
        result.push(map.has(key) ? map.get(key) : "?");

        // Skip ')'
        i++;
    }

    return result.join("");
};