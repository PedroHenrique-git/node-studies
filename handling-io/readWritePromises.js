const fs = require('fs/promises');
const path = require('path');

const filePath = path.resolve(process.cwd(), 'hello.txt');

fs.readFile(filePath, 'utf-8').then(data => {
    console.log('data --> ', data);
});

fs.writeFile(filePath, 'WRITE WITH PROMISE!', { encoding: 'utf-8' }).then((value) => {
    console.log('value --> ', value);
});