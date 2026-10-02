
import http from "node:http";

const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "application/json");

    // GET /
    if (req.method === "GET" && req.url === "/") {
        res.writeHead(200);
        res.end(JSON.stringify({ status: "ok" }));
        return;
    }

    // GET /api/meter
    if (req.method === "GET" && req.url === "/api/meter") {
        res.writeHead(200);
        res.end(JSON.stringify({
            meterId: "SM-001",
            currentUsage: 2.45,
            unit: "kW",
            timestamp: new Date().toISOString()
        }));
        return;
    }

    // 404 - endpoint not found
    res.writeHead(404);
    res.end(JSON.stringify({
        error: "Endpoint not found"
    }));
});

server.listen(3000, "0.0.0.0", () => {
    console.log("Server listening on port 3000");
});
