
var ProductOfNumbers = function() {
    
};

/** 
 * @param {number} num
 * @return {void}
 */
ProductOfNumbers.prototype.add = function(num) {
    
};

/** 
 * @param {number} k
 * @return {number}
 */
ProductOfNumbers.prototype.getProduct = function(k) {
    
};


var ProductOfNumbers = function() {
    this.prefix = [1];
};

ProductOfNumbers.prototype.add = function(num) {
    if (num === 0) {
        this.prefix = [1];
    } else {
        let last = this.prefix[this.prefix.length - 1];
        this.prefix.push(last * num);
    }
};

ProductOfNumbers.prototype.getProduct = function(k) {
    let n = this.prefix.length;

    if (k >= n) {
        return 0;
    }

    return this.prefix[n - 1] / this.prefix[n - 1 - k];
};
