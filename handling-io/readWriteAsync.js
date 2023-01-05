const fs = require('fs');
const path = require('path');

const filePath = path.resolve(process.cwd(), 'hello.txt');

fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
    if(err) {
        return console.log('err -> ', err);
    }

    console.log('File contents: ', data);

    const upperContents = data.toUpperCase() + ' async';

    fs.writeFile(filePath, upperContents, (err) => {
        if(err) {
            return console.log('err update file');
        } 

        console.log('file updated');
    })
})