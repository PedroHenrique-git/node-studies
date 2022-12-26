const { cpus } = require('os')
const { Worker, isMainThread, threadId, workerData, parentPort } = require('worker_threads')

const numberOfCpus = cpus().length

if(isMainThread) {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    for(let i = 0; i < numberOfCpus; i++) {
        new Worker(__filename, { workerData: { shareData: numbers } })
    }

} else {
    const { shareData } = workerData
    console.log('shareData --> ', shareData)
}