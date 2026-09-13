/**
 * @param {number[][]} img1
 * @param {number[][]} img2
 * @return {number}
 */


var largestOverlap = function(img1, img2) {
    const n = img1.length;

    const ones1 = [];
    const ones2 = [];

    // Store positions of all 1s
    for (let r = 0; r < n; r++) {
        for (let c = 0; c < n; c++) {
            if (img1[r][c] === 1) {
                ones1.push([r, c]);
            }

            if (img2[r][c] === 1) {
                ones2.push([r, c]);
            }
        }
    }

    const shifts = new Map();
    let answer = 0;

    // Try every possible alignment of a 1 from img1 with a 1 from img2
    for (const [r1, c1] of ones1) {
        for (const [r2, c2] of ones2) {
            const dr = r2 - r1;
            const dc = c2 - c1;

            const key = `${dr},${dc}`;

            const count = (shifts.get(key) || 0) + 1;
            shifts.set(key, count);

            answer = Math.max(answer, count);
        }
    }

    return answer;
};

