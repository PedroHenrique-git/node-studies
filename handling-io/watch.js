const fs = require('fs');

const file = process.argv[2];

fs.watchFile(file, (current, previous) => {
    return console.log(`${file} updated ${previous.mtime}`);
});