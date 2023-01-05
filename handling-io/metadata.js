const fs = require('fs');
const path = require('path');

const file = process.argv[2];
const filePath = path.join(__dirname, file);

fs.access(filePath, (err, data) => {
    console.log('err -> ', err);
    console.log('data --> ', data);
});

fs.readdir(__dirname, 'utf-8', (_, files) => {
    console.log('files --> ', files);
});

function printMetadata(file) {
    const fileStats = fs.statSync(file);
    console.log('fileStats --> ', fileStats);
}

printMetadata(file);

fs.chmodSync(
    file,
    fs.constants.S_IRUSR |
    fs.constants.S_IWUSR |
    fs.constants.S_IRGRP |
    fs.constants.S_IWGRP |
    fs.constants.S_IROTH
);

fs.chmodSync(file, 0o664);

console.log(fs.lstatSync("link-to-file"));
