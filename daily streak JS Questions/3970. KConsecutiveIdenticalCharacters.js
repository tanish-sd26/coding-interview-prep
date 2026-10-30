/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {string} labels
 * @param {number} k
 * @return {number}
 */
var shortestPath = function(n, edges, labels, k) {
    const graph = Array.from({ length: n }, () => []);

    for (const [u, v, w] of edges) {
        graph[u].push([v, w]);
    }

    if (k === 0) return -1;

    const dist = Array.from(
        { length: n },
        () => Array(k + 1).fill(Infinity)
    );

    // Min heap: [distance, node, consecutiveCount]
    class MinHeap {
        constructor() {
            this.heap = [];
        }

        push(value) {
            this.heap.push(value);
            let i = this.heap.length - 1;

            while (i > 0) {
                const p = Math.floor((i - 1) / 2);
                if (this.heap[p][0] <= value[0]) break;

                this.heap[i] = this.heap[p];
                i = p;
            }

            this.heap[i] = value;
        }

        pop() {
            const root = this.heap[0];
            const last = this.heap.pop();

            if (this.heap.length > 0) {
                let i = 0;

                while (true) {
                    let child = i * 2 + 1;

                    if (child >= this.heap.length) break;

                    if (
                        child + 1 < this.heap.length &&
                        this.heap[child + 1][0] < this.heap[child][0]
                    ) {
                        child++;
                    }

                    if (this.heap[child][0] >= last[0]) break;

                    this.heap[i] = this.heap[child];
                    i = child;
                }

                this.heap[i] = last;
            }

            return root;
        }

        get size() {
            return this.heap.length;
        }
    }

    const heap = new MinHeap();

    dist[0][1] = 0;
    heap.push([0, 0, 1]);

    while (heap.size > 0) {
        const [cost, u, count] = heap.pop();

        if (cost !== dist[u][count]) continue;

        if (u === n - 1) return cost;

        for (const [v, w] of graph[u]) {
            const nextCount =
                labels[u] === labels[v] ? count + 1 : 1;

            if (nextCount > k) continue;

            const nextCost = cost + w;

            if (nextCost < dist[v][nextCount]) {
                dist[v][nextCount] = nextCost;
                heap.push([nextCost, v, nextCount]);
            }
        }
    }

    return -1;
};