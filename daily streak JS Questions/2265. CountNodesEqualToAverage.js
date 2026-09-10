/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var averageOfSubtree = function(root) {
    let answer = 0;

    function dfs(node) {
        if (node === null) {
            return [0, 0];
        }

        // Get sum and count from left and right subtrees
        const [leftSum, leftCount] = dfs(node.left);
        const [rightSum, rightCount] = dfs(node.right);

        // Calculate current subtree sum and count
        const sum = node.val + leftSum + rightSum;
        const count = 1 + leftCount + rightCount;

        // Check if node value equals floor(subtree average)
        if (node.val === Math.floor(sum / count)) {
            answer++;
        }

        return [sum, count];
    }

    dfs(root);

    return answer;
};