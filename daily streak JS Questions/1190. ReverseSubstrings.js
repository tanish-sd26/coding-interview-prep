/**
 * @param {string} s
 * @return {string}
 */
var reverseParentheses = function(s) {
    const stack = [];
    let current = "";

    for (const ch of s) {
        if (ch === "(") {
            // Save the string outside this parenthesis
            stack.push(current);
            current = "";
        } 
        else if (ch === ")") {
            // Reverse the current substring
            current = current.split("").reverse().join("");

            // Attach it to the previous outer string
            current = stack.pop() + current;
        } 
        else {
            current += ch;
        }
    }

    return current;
};