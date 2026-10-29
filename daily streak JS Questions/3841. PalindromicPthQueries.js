/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {string} s
 * @param {string[]} queries
 * @return {boolean[]}
 */

var palindromePath = function(n, edges, s, queries) {
    const graph = Array.from({ length: n }, () => []);

    for (const [u, v] of edges) {
        graph[u].push(v);
        graph[v].push(u);
    }

    const parent = new Array(n).fill(-1);
    const depth = new Array(n).fill(0);
    const order = [0];
    parent[0] = 0;

    for (let i = 0; i < order.length; i++) {
        const u = order[i];

        for (const v of graph[u]) {
            if (v === parent[u]) continue;

            parent[v] = u;
            depth[v] = depth[u] + 1;
            order.push(v);
        }
    }

    const size = new Array(n).fill(1);
    const heavy = new Array(n).fill(-1);
    const heavySize = new Array(n).fill(0);

    for (let i = n - 1; i > 0; i--) {
        const u = order[i];
        const p = parent[u];

        size[p] += size[u];

        if (size[u] > heavySize[p]) {
            heavySize[p] = size[u];
            heavy[p] = u;
        }
    }

    const head = new Array(n);
    const pos = new Array(n);
    let timer = 0;
    const stack = [[0, 0]];

    while (stack.length) {
        const [start, chainHead] = stack.pop();

        for (let u = start; u !== -1; u = heavy[u]) {
            head[u] = chainHead;
            pos[u] = timer++;

            for (const v of graph[u]) {
                if (parent[v] === u && v !== heavy[u]) {
                    stack.push([v, v]);
                }
            }
        }
    }

    let segSize = 1;
    while (segSize < n) segSize *= 2;

    const tree = new Array(segSize * 2).fill(0);
    const chars = s.split('');

    for (let u = 0; u < n; u++) {
        tree[segSize + pos[u]] =
            1 << (chars[u].charCodeAt(0) - 97);
    }

    for (let i = segSize - 1; i > 0; i--) {
        tree[i] = tree[i * 2] ^ tree[i * 2 + 1];
    }

    function update(index, value) {
        let p = segSize + index;
        tree[p] = value;

        while (p > 1) {
            p >>= 1;
            tree[p] = tree[p * 2] ^ tree[p * 2 + 1];
        }
    }

    function rangeXor(left, right) {
        let l = left + segSize;
        let r = right + segSize;
        let result = 0;

        while (l <= r) {
            if (l & 1) result ^= tree[l++];
            if (!(r & 1)) result ^= tree[r--];

            l >>= 1;
            r >>= 1;
        }

        return result;
    }

    function pathXor(u, v) {
        let result = 0;

        while (head[u] !== head[v]) {
            if (depth[head[u]] < depth[head[v]]) {
                [u, v] = [v, u];
            }

            result ^= rangeXor(pos[head[u]], pos[u]);
            u = parent[head[u]];
        }

        if (depth[u] > depth[v]) {
            [u, v] = [v, u];
        }

        result ^= rangeXor(pos[u], pos[v]);
        return result;
    }

    const answer = [];

    for (const query of queries) {
        const parts = query.split(' ');

        if (parts[0] === 'update') {
            const u = Number(parts[1]);
            const c = parts[2];

            chars[u] = c;
            update(pos[u], 1 << (c.charCodeAt(0) - 97));
        } else {
            const u = Number(parts[1]);
            const v = Number(parts[2]);
            const mask = pathXor(u, v);

            answer.push((mask & (mask - 1)) === 0);
        }
    }

    return answer;
};
