const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'file.txt'); 
const file = fs.createWriteStream(filePath);

for(let i = 0; i <= 1000000; i++) {
    file.write("Node.js is a JavaScript runtime built on Google Chrome's V8 JavaScript engine.\n");
}