const fs = require('fs');
const path = require('path');

const filePath = path.resolve(process.cwd(), 'hello.txt');

const contents = fs.readFileSync(filePath, { encoding: 'utf-8' });

console.log('File contents: ', contents);

const upperContents = contents.toUpperCase();


fs.writeFileSync(filePath, upperContents, { encoding: 'utf-8' });

console.log('File updated.');