const fs = require("fs");
const http = require("http");
const path = require("path");

const index = fs.readFileSync(path.join(__dirname, "public", "ws-index.html"));

const server = http.createServer((req, res) => {
  res.setHeader("Content-type", "text/html");
  res.end(index);
});

server.listen(8080);
