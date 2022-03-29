const spawn = require('child_process').spawn;
const exec = require('child_process').exec;
const execFile = require('child_process').execFile;
const ls = spawn('ls', ['-lh', '/usr']);

const child = execFile('node', ['--version'], (err, stdout, stderr) => {
    if(err) {
        throw err;
    }

    console.log(stdout);
});

ls.stdout.on('data', (data) => {
    console.log(`stdout ${data}`);
});

ls.stderr.on('data', (data) => {
    console.log(`stderr ${data}`);
});

ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
});

exec('cat *.js | wc -l', (err, stdout, stderr) => {
    if(err) {
        console.error(`exec error ${err}`);
    }

    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
});