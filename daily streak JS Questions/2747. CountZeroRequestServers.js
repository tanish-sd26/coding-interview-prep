/**
 * @param {number} n
 * @param {number[][]} logs
 * @param {number} x
 * @param {number[]} queries
 * @return {number[]}
 */
var countServers = function(n, logs, x, queries) {
    logs.sort((a, b) => a[1] - b[1]);

    const sortedQueries = queries
        .map((time, index) => [time, index])
        .sort((a, b) => a[0] - b[0]);

    const freq = new Map();
    const answer = new Array(queries.length).fill(0);

    let left = 0;
    let right = 0;
    let activeServers = 0;

    for (const [time, index] of sortedQueries) {
        const start = time - x;

        // Add logs within the current window
        while (right < logs.length && logs[right][1] <= time) {
            const server = logs[right][0];

            freq.set(server, (freq.get(server) || 0) + 1);

            if (freq.get(server) === 1) {
                activeServers++;
            }

            right++;
        }

        // Remove logs outside the current window
        while (left < right && logs[left][1] < start) {
            const server = logs[left][0];

            freq.set(server, freq.get(server) - 1);

            if (freq.get(server) === 0) {
                activeServers--;
            }

            left++;
        }

        answer[index] = n - activeServers;
    }

    return answer;
}