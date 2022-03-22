const http = require('http');

const APP_PORT = process.env.PORT || 1337;

const routes = {
    '/': (_, res) => {
        res.writeHead(200);
        res.end('Hello world!');
    },
    '/foo': (_, res) => {
        res.writeHead(200);
        res.end('You are now viewing foo!');
    }
}

const server = http.createServer((req, res) => {
    const url = req.url; 

    if(url in routes) {
        return routes[url](req, res);
    }

    res.writeHead(404);
    res.end(http.STATUS_CODES[404]);
});

server.listen(APP_PORT);