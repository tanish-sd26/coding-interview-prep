/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number[][]} queries
 * @return {number[]}
 */
var resultArray = function(nums, k, queries) {
    const n = nums.length;

    let size = 1;
    while (size < n) size <<= 1;

    // prod[node] = product of the whole segment % k
    const prod = new Int32Array(2 * size);

    // pref[node * k + r] =
    // number of non-empty prefixes having product % k = r
    const pref = new Int32Array(2 * size * k);

    // Multiplicative identity
    const identity = 1 % k;

    for (let i = 0; i < size; i++) {
        prod[size + i] = identity;
    }

    // Build leaves
    for (let i = 0; i < n; i++) {
        const node = size + i;
        const rem = nums[i] % k;

        prod[node] = rem;
        pref[node * k + rem] = 1;
    }

    // Merge two children
    function pull(node) {
        const left = node << 1;
        const right = left | 1;

        const leftProd = prod[left];

        prod[node] = (leftProd * prod[right]) % k;

        const base = node * k;
        const leftBase = left * k;
        const rightBase = right * k;

        // Prefix lies completely inside left child
        for (let r = 0; r < k; r++) {
            pref[base + r] = pref[leftBase + r];
        }

        // Prefix contains all of left + prefix of right
        for (let r = 0; r < k; r++) {
            const newRem = (leftProd * r) % k;
            pref[base + newRem] += pref[rightBase + r];
        }
    }

    // Build tree
    for (let node = size - 1; node >= 1; node--) {
        pull(node);
    }

    function update(index, value) {
        let node = size + index;
        const rem = value % k;

        prod[node] = rem;

        const base = node * k;

        for (let r = 0; r < k; r++) {
            pref[base + r] = 0;
        }

        pref[base + rem] = 1;

        node >>= 1;

        while (node > 0) {
            pull(node);
            node >>= 1;
        }
    }

    /*
        Query [start, n - 1]

        We need all non-empty prefixes of this range.
    */
    function query(start) {
        let left = size + start;
        let right = size + n;

        // Left accumulator
        let leftProd = identity;
        const leftPref = new Int32Array(k);

        // Right accumulator
        let rightProd = identity;
        const rightPref = new Int32Array(k);

        while (left < right) {

            // Take left node
            if (left & 1) {
                const nodeBase = left * k;

                const oldProd = leftProd;

                // Existing left prefixes
                const temp = new Int32Array(k);

                for (let r = 0; r < k; r++) {
                    temp[r] = leftPref[r];
                }

                // Prefixes = whole left accumulator + prefix of node
                for (let r = 0; r < k; r++) {
                    const newRem = (oldProd * r) % k;
                    temp[newRem] += pref[nodeBase + r];
                }

                for (let r = 0; r < k; r++) {
                    leftPref[r] = temp[r];
                }

                leftProd = (oldProd * prod[left]) % k;

                left++;
            }

            // Take right node
            if (right & 1) {
                --right;

                const nodeBase = right * k;
                const nodeProd = prod[right];

                const temp = new Int32Array(k);

                // Prefixes completely inside this node
                for (let r = 0; r < k; r++) {
                    temp[r] = pref[nodeBase + r];
                }

                // Prefixes = whole node + prefix of right accumulator
                for (let r = 0; r < k; r++) {
                    const newRem = (nodeProd * r) % k;
                    temp[newRem] += rightPref[r];
                }

                for (let r = 0; r < k; r++) {
                    rightPref[r] = temp[r];
                }

                rightProd = (nodeProd * rightProd) % k;
            }

            left >>= 1;
            right >>= 1;
        }

        // Merge left accumulator + right accumulator
        const result = new Int32Array(k);

        for (let r = 0; r < k; r++) {
            result[r] = leftPref[r];
        }

        for (let r = 0; r < k; r++) {
            const newRem = (leftProd * r) % k;
            result[newRem] += rightPref[r];
        }

        return result;
    }

    const answer = [];

    for (const [index, value, start, x] of queries) {
        // This update persists for all future queries.
        update(index, value);

        // Count prefix products in nums[start...n-1].
        const counts = query(start);

        answer.push(counts[x]);
    }

    return answer;
};