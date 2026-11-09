/**
 * @param {number[]} servers
 * @param {number[]} tasks
 * @return {number[]}
 */
var assignTasks = function(servers, tasks) {
    class MinHeap {
        constructor(compare) {
            this.heap = [];
            this.compare = compare;
        }

        push(value) {
            const heap = this.heap;
            heap.push(value);

            let i = heap.length - 1;

            while (i > 0) {
                const p = Math.floor((i - 1) / 2);

                if (this.compare(heap[p], value) <= 0) break;

                heap[i] = heap[p];
                i = p;
            }

            heap[i] = value;
        }

        pop() {
            const heap = this.heap;
            const root = heap[0];
            const last = heap.pop();

            if (heap.length > 0) {
                let i = 0;

                while (true) {
                    let child = 2 * i + 1;

                    if (child >= heap.length) break;

                    if (
                        child + 1 < heap.length &&
                        this.compare(heap[child + 1], heap[child]) < 0
                    ) {
                        child++;
                    }

                    if (this.compare(last, heap[child]) <= 0) break;

                    heap[i] = heap[child];
                    i = child;
                }

                heap[i] = last;
            }

            return root;
        }

        peek() {
            return this.heap[0];
        }

        get size() {
            return this.heap.length;
        }
    }

    // Available servers: [weight, index]
    const available = new MinHeap((a, b) =>
        a[0] - b[0] || a[1] - b[1]
    );

    // Busy servers: [freeTime, weight, index]
    const busy = new MinHeap((a, b) =>
        a[0] - b[0] || a[1] - b[1] || a[2] - b[2]
    );

    for (let i = 0; i < servers.length; i++) {
        available.push([servers[i], i]);
    }

    const ans = [];
    let time = 0;

    for (let i = 0; i < tasks.length; i++) {
        time = Math.max(time, i);

        // Release all servers that have finished
        while (busy.size > 0 && busy.peek()[0] <= time) {
            const [freeTime, weight, index] = busy.pop();
            available.push([weight, index]);
        }

        // Wait until the earliest server becomes free
        if (available.size === 0) {
            time = busy.peek()[0];

            while (busy.size > 0 && busy.peek()[0] <= time) {
                const [freeTime, weight, index] = busy.pop();
                available.push([weight, index]);
            }
        }

        // Assign the task to the best available server
        const [weight, index] = available.pop();

        ans.push(index);

        busy.push([
            time + tasks[i],
            weight,
            index
        ]);
    }

    return ans;
};