'use strict'

const tls = require('tls');
const fs = require('fs');

const PORT = 1337;
const HOST = '127.0.0.1';

const options = {
    key: fs.readFileSync('../keys/private-key.pem'),
    cert: fs.readFileSync('../keys/public-cert.pem') 
};

const server = tls.createServer(options, (socket) => {
    socket.write('I am the server sending you a message.');

    socket.on('data', (data) => {
        console.log('Received: %s [it is %d bytes long]', data.toString().replace(/(\n)/gm, ''), data.length);
    });

    socket.on('end', () => {
        console.log('EOT (End of transmission)');
    });
});

server.listen(PORT, HOST, () => {
    console.log('I\'m listening at %s, on port %s', HOST, PORT);
});

server.on('error', (error) => {
    console.log(error);
    server.close();
});