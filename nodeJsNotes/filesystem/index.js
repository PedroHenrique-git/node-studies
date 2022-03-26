const fs = require('fs');
const readline = require('readline');
const { resolve } = require('path');

fs.readFile(resolve(__dirname, 'hello.txt'), { encoding: 'utf-8' }, (err, content) => {
    if(err) return console.error(err);
    console.log(content);
});

fs.readFile(resolve(__dirname, 'hello.txt'), (err, data) => {
    if(err) return console.error(err);
    console.log(data.toString('hex'));
});

fs.readdir(__dirname, (err, files) => {
    if(err) return console.error(err);
    console.log(files, files.join(' '));
});

const run = (gen) => {
    const iter = gen((err, data) => {
        if(err) iter.throw(err);
        return iter.next(data);
    });

    iter.next();
};

run(function* (resume) {
    const contents = yield fs.readdir(__dirname, resume);
    console.log(contents)
});

const readable = fs.createReadStream(__dirname + '/hello.txt', { encoding: 'utf-8', highWaterMark: 16 * 1024 });
const writable = fs.createWriteStream(__dirname + '/pipe.txt');
readable.pipe(writable);

try {
    const content = fs.readFileSync(__dirname + '/hello.txt', { encoding: 'utf-8' });
    console.log('CONTENT --> ', content);
} catch(err) {
    console.log(err);
}

fs.access(__dirname, fs.constants.F_OK, (err) => {
    if(err) {
        console.log('%s doesnt exist', __dirname);
    } else {
        console.log('can execute %s', __dirname);
    }
});

try {
    fs.accessSync(__dirname, fs.constants.W_OK);
    console.log('can write %s ', __dirname);
} catch(err) {
    console.log(err);
}

fs.stat(__dirname + '/hello.txt', function(err) {
    if(!err) {
        console.log('file or directory exists');
    } else if( err.code === 'ENOENT' ) {
        console.log('file or directory does not exists');
    }
});

try {
    fs.statSync(__dirname);
    console.log('file or directory exists 2');
} catch(err) {
    if(err.code === 'ENOENT') {
        console.log('file or directory does not exists');
    }
}

const file = __dirname + '/hello.txt';
let linesCount = 0;

const rl = readline.createInterface({
    input: fs.createReadStream(file),
    output: process.stdout,
    terminal: false
});

rl.on('line', function(line) {
    console.log('LINE --> ', line);
    linesCount++;
});

rl.on('close', function() {
    console.log('LINE COUNT--> ', linesCount);
});

function mkdir(dirPath, callback) {
    fs.mkdir(dirPath, (err) => {
        callback(err && err.code !== 'EEXIST' ? err : null)
    });
}

mkdir(__dirname, (err) => {
    if(err)
        return console.error(err.code);
    
    console.log('EXISTE');
});

function mkdirSync(dirPath) {
    try {
        fs.mkdirSync(dirPath);
        console.log('MKDIR SYNC');
    } catch(err) {
        if(err.code !== 'EEXIST') throw err;
    }
}

mkdirSync(__dirname);

const writable2 = fs.createWriteStream(__dirname + '/hello-copy.txt');

readable.on('data', function(chunk) {
    writable2.write(chunk);
});

fs.writeFile(__dirname + '/hello.txt', ' Pedro', (err) => {
    if(err) return console.error(err);
});

const buffer = Buffer.from([ 0x48, 0x65, 0x6c, 0x6c, 0x6f ]);

fs.writeFile(__dirname + '/hello.txt', buffer, (err) => {
    if(err) return console.error(err);
});

fs.readFile(__dirname + '/hello.txt', { encoding: 'utf-8' }, function(err, data) {
    if(err) throw err;

    const newValue = data + ' TESTE TESTE TESTE';

    fs.writeFile(__dirname + '/hello.txt', newValue, 'utf-8', function(err, data) {
        if(err) throw err;
        console.log('Done!');
    });
});

/*
    fs.unlink(__dirname + '/hello.txt', function(err) {
        if(err) throw err;
        console.log('File deleted');
    });
*/

const chunks = [];
let fileBuffer;
const fileStream2 = fs.createReadStream(__dirname + '/hello-copy.txt');

fileStream2.once('error', (err) => {
    console.error(err);
});

fileStream2.once('end', () => {
    fileBuffer = Buffer.concat(chunks);
});

fileStream2.on('data', (chunk) => {
   chunks.push(chunk);
});

console.log('CHUNKS --> ', chunks.join(' '));
