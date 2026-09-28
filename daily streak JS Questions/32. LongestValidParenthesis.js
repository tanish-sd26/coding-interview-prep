var longestValidParentheses = function(s) {
    const stack = [-1];
    let answer = 0;

    for (let i = 0; i < s.length; i++) {
        if (s[i] === "(") {
            stack.push(i);
        } else {
            // Try to match this ')'
            stack.pop();

            if (stack.length === 0) {
                // Invalid ')' becomes the new boundary
                stack.push(i);
            } else {
                // Valid substring found
                const length = i - stack[stack.length - 1];
                answer = Math.max(answer, length);
            }
        }
    }

    return answer;
};