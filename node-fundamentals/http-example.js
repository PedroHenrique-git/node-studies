const { get } = require('http');
const { get: getHttp } = require('https');

get('http://www.google.com', (response) => {
    response.on('data', (chunk) => {
        console.log(`Data chunk ${chunk}`);
    });

    response.on('end', () => {
        console.log('Node more data');
    });
});

getHttp('https://www.google.com', (response) => {
    response.on('data', (chunk) => {
        console.log(`Data chunk https ${chunk}`);
    });

    response.on('end', () => {
        console.log('Node more data https');
    });
});