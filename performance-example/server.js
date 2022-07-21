const express = require('express')
const cluster = require('cluster')
const os = require('os')

function delay(duration = 500) {
    const startTime = Date.now()
    while(Date.now() - startTime < duration);
}

function sleep(duration = 9000) {
    return new Promise((resolve) => setTimeout(() => resolve(), duration))
}

console.log('Running server.js...')

if(cluster.isMaster) {
    console.log('Master has been started...')
    const NUM_WORKERS = os.cpus().length

    for(let i = 0; i < NUM_WORKERS; i++) {
        cluster.fork()
    }

    cluster.on("exit", (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`)
        console.log("Let's fork another worker!")
        cluster.fork()
    });
} else {
    console.log('Worker process started...')
    const app = express()

    app.get('/', async (_, res) => {
        await sleep()
        res.send(`Performance example ${process.pid}`)
    })
    
    app.get('/timer', async (_, res) => {
        await sleep()
        res.send(`Ding ding ding! ${process.pid}`)
    })

    app.listen(3000)
}
