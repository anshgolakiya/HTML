const http = require("http");

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        "Content-Type": "text/html"
    });

    res.write("<h2>Hello from Node.js</h2>");
    res.write("<p>This is my first Node.js HTTP Server.</p>");

    res.end();
});

server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
