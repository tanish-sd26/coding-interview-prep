/**
 * @param {number[]} rec1
 * @param {number[]} rec2
 * @return {boolean}
 */

var isRectangleOverlap = function(rec1, rec2) {
    // Find the intersection boundaries
    const left = Math.max(rec1[0], rec2[0]);
    const right = Math.min(rec1[2], rec2[2]);

    const bottom = Math.max(rec1[1], rec2[1]);
    const top = Math.min(rec1[3], rec2[3]);

    // Both width and height must be positive
    return right > left && top > bottom;
};
