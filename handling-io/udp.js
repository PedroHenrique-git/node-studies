const dgram = require('dgram');

const socket = dgram.createSocket('udp6');

socket.bind(3000);