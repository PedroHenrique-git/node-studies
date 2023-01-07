const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'file.txt'); 

const rs = fs.createReadStream(filePath);

rs.on('data', (data) => {
    console.log('Read chunk: ', data.toString());
});

rs.on('end', () => {
    console.log('No more data');
});