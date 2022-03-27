const { EventEmitter } = require('events');
const serverEvents = new EventEmitter();

const http = require('http');

const httpServer = http.createServer((request, response) => {
    serverEvents.emit('request', request.method, request.url);
});

module.exports = serverEvents;