const http = require('http');

function startServer() {
    const server = http.createServer((req, res) => {
        res.writeHead(200);
        res.end('Hello http');
    });

    server.listen(3000);
}

if(!module.parent) {
    startServer();
} else {
    module.exports = startServer;
}