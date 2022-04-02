const http = require('http');
const HTTP_PORT = 3000;

const handler = (req, res) => {
    const clientIp = req.connection.remoteAddress;
    const connectUsing = req.connection.encrypt ? 'SSL' : 'HTTP';
    console.log('Request received: ' + connectUsing + ' ' + req.method + ' ' + req.url);
    console.log('Client IP: ' + clientIp);

    res.writeHead(200, 'OK', { 'Content-Type': 'text/plain' });
    res.write('OK');
    res.end();
    return;
}

const startCallback = () => {
    console.log('Start HTTP on port: ' + HTTP_PORT);
}

const server = http.createServer(handler);

server.listen(HTTP_PORT, startCallback);