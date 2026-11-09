/**
 * @param {number} k
 * @param {number[]} arrival
 * @param {number[]} load
 * @return {number[]}
 */
var busiestServers = function(k, arrival, load) {
    const n = arrival.length;

    // Available servers, initially 0 to k - 1
    const available = Array.from({ length: k }, (_, i) => i);

    // Min-heap: [finishTime, serverId]
    const busy = [];

    const counts = Array(k).fill(0);

    function push(item) {
        busy.push(item);
        let i = busy.length - 1;

        while (i > 0) {
            const p = Math.floor((i - 1) / 2);

            if (busy[p][0] <= busy[i][0]) break;

            [busy[p], busy[i]] = [busy[i], busy[p]];
            i = p;
        }
    }

    function pop() {
        const result = busy[0];
        const last = busy.pop();

        if (busy.length > 0) {
            busy[0] = last;
            let i = 0;

            while (true) {
                let smallest = i;
                const left = 2 * i + 1;
                const right = 2 * i + 2;

                if (left < busy.length && busy[left][0] < busy[smallest][0]) {
                    smallest = left;
                }

                if (right < busy.length && busy[right][0] < busy[smallest][0]) {
                    smallest = right;
                }

                if (smallest === i) break;

                [busy[i], busy[smallest]] = [busy[smallest], busy[i]];
                i = smallest;
            }
        }

        return result;
    }

    // Binary search: first available server >= target
    function findServer(target) {
        let left = 0;
        let right = available.length;

        while (left < right) {
            const mid = Math.floor((left + right) / 2);

            if (available[mid] < target) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }

        return left;
    }

    for (let i = 0; i < n; i++) {
        // Release servers whose requests have finished
        while (busy.length > 0 && busy[0][0] <= arrival[i]) {
            const [finishTime, server] = pop();

            const pos = findServer(server);
            available.splice(pos, 0, server);
        }

        if (available.length === 0) continue;

        // Find the next available server starting from i % k
        const target = i % k;
        let pos = findServer(target);

        if (pos === available.length) {
            pos = 0;
        }

        const server = available.splice(pos, 1)[0];

        counts[server]++;
        push([arrival[i] + load[i], server]);
    }

    const maxRequests = Math.max(...counts);

    return counts
        .map((count, server) => count === maxRequests ? server : -1)
        .filter(server => server !== -1);
};