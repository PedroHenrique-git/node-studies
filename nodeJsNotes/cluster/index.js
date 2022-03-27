const cluster = require('cluster');
const http = require('http');
const numCpus = require('os').cpus().length;

if(cluster.isPrimary) {
    for(let i = 0; i < numCpus; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {
    require('./server.js')();
}