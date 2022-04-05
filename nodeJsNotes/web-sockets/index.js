const WebSocket = require('ws');

const wss = new WebSocket("ws://host:8080");

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received: ', message)
    })
    ws.send('something');
})