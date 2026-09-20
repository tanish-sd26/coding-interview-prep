/**
 * @param {string} s
 * @return {number}
 */
var reverseDegree = function(s) {
    let answer = 0;

    for (let i = 0; i < s.length; i++) {
        const alphabetPosition = s.charCodeAt(i) - 96;
        const reversePosition = 27 - alphabetPosition;

        answer += reversePosition * (i + 1);
    }

    return answer;
};