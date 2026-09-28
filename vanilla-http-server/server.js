const http = require("http");

const server = http.createServer((req, res) => {

    // GET /
    if (req.method === "GET" && req.url === "/") {

        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");

        res.end("<h1>Hello</h1>");
        return;
    }


    // GET /json
    if (req.method === "GET" && req.url === "/json") {

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");

        res.end(JSON.stringify({ ok: true }));
        return;
    }


    // POST /echo
    if (req.method === "POST" && req.url === "/echo") {

        let body = "";

        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", () => {

            try {
                JSON.parse(body);

                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");

                res.end(body);

            } catch (error) {

                res.statusCode = 400;
                res.setHeader("Content-Type", "application/json");

                res.end(JSON.stringify({
                    error: "Invalid JSON"
                }));
            }
        });

        return;
    }


    // Route not found
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");

    res.end(JSON.stringify({
        error: "Not Found"
    }));
});


server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});