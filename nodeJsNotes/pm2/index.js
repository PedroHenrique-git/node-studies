const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200);
    res.write('Hello');
});

server.listen(3000);