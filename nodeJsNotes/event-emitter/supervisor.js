const server = require('./server');

server.on('request', (method, url) => {
    console.log('Got a request: ' + method + ' ' + url)
});