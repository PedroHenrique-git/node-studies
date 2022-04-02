const http = require('http');

const options = {
    hostname: '127.0.0.1',
    port: 3000,
    path: '/',
    method: 'GET'
}

const req = http.request(options, (res) => {
    console.log('STATUS: ', res.statusCode);
    console.log('HEADERS: ', JSON.stringify(res.headers));

    res.setEncoding('utf-8');

    res.on('data', (chunk) => {
        console.log('Response: ' + chunk);
    });

    res.on('end', (chunk) => {
        console.log('Response: ' + chunk);
    });
});

req.on('error', (e) => console.log('problem with request: ' + e.message));

req.end();