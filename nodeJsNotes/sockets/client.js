'use strict'

const tls = require('tls');
const fs = require('fs');

const PORT = 1337;
const HOST = '127.0.0.1';

const options = {
    key: fs.readFileSync('../keys/private-key.pem'),
    cert: fs.readFileSync('../keys/public-cert.pem'),
    rejectUnauthorized: false
};

const client = tls.connect(PORT, HOST, options, () => {
    if(client.authorized) {
        console.log("Connection authorized by Certificate Authority.");
    } else {
        console.log("Connection not authorized: " + client.authorizationError);
    }

    client.write("I am the client sending you a message");
});

client.on("data", (data) => {
    console.log('Received: %s [it is %d bytes long]', data.toString().replace(/(\n)/gm, ''), data.length);
});

client.on('close', () => {
    console.log('Connection closed');
});

client.on('error', (error) => {
    console.log(error);
    client.destroy();
});