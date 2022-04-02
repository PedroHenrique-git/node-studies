const http = require('http');
const fs = require('fs');

const readable = fs.createReadStream('file1.txt');
const writable = fs.createReadStream('file2.txt');

readable.pipe(writable);

const server = http.createServer((req, res) => {
    const stream = fs.createReadStream(__dirname + '/data.txt');
    stream.pipe(res);
});

server.listen(8000);