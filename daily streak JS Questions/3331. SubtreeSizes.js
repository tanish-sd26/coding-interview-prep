/**
 * @param {number[]} parent
 * @param {string} s
 * @return {number[]}
 */

var findSubtreeSizes = function(parent, s) {
    const n = parent.length;

    // Build the original tree
    const children = Array.from({ length: n }, () => []);

    for (let i = 1; i < n; i++) {
        children[parent[i]].push(i);
    }

    // Find the closest matching ancestor for every node
    const lastSeen = new Int32Array(26).fill(-1);
    const newParent = [...parent];
    const previous = new Int32Array(n).fill(-1);

    const stack = [[0, 0]];

    while (stack.length > 0) {
        const [node, state] = stack.pop();
        const char = s.charCodeAt(node) - 97;

        if (state === 0) {
            // Enter node
            const ancestor = lastSeen[char];

            if (node !== 0 && ancestor !== -1) {
                newParent[node] = ancestor;
            }

            previous[node] = lastSeen[char];
            lastSeen[char] = node;

            // Exit event
            stack.push([node, 1]);

            // Visit original children
            for (let i = children[node].length - 1; i >= 0; i--) {
                stack.push([children[node][i], 0]);
            }
        } else {
            // Exit node: restore ancestor state
            lastSeen[char] = previous[node];
        }
    }

    // Build the modified tree
    const newChildren = Array.from({ length: n }, () => []);

    for (let i = 1; i < n; i++) {
        newChildren[newParent[i]].push(i);
    }

    // Get traversal order of modified tree
    const order = [];
    const traversal = [0];

    while (traversal.length > 0) {
        const node = traversal.pop();
        order.push(node);

        for (const child of newChildren[node]) {
            traversal.push(child);
        }
    }

    // Calculate subtree sizes using reverse traversal
    const answer = Array(n).fill(1);

    for (let i = order.length - 1; i > 0; i--) {
        const node = order[i];
        answer[newParent[node]] += answer[node];
    }

    return answer;
};
