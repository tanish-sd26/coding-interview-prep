/**
 * @param {number} n
 * @return {boolean}
 */
var canAliceWin = function(n) {
    let stones = n;
    let remove = 10;
    let aliceTurn = true;

    while (stones >= remove) {
        stones -= remove;
        remove--;

        aliceTurn = !aliceTurn;
    }

    return !aliceTurn;
};