const cluster = require('cluster');
const http = require('http');
const numCpus = require('os').cpus().length;

if(cluster.isPrimary) {
    for(let i = 0; i < numCpus; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        if(signal) {
            console.log(`worker was killed by signal: ${signal}`);
        } else if(code !== 0) {
            console.log(`worker exited with error code: ${code}`);
        } else {
            console.log('worker success!');
        }

        console.log(`worker ${worker.process.pid} died`);
    });
} else {
    require('./server.js')();
}