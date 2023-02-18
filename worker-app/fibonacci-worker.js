const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
  threadId,
} = require("worker_threads");
const { cpus } = require("os");
const fibonacci = require("./fibonacci");

const n = 10;

if (isMainThread) {
  for (let i = 0; i < cpus().length; i++) {
    new Worker(__filename, {
      workerData: n,
    }).on("message", (msg) => {
      console.log(
        `The fibonacci number at position ${msg.position} is ${msg.result}`
      );
    });
  }
} else {
  parentPort.postMessage({
    result: fibonacci(workerData * threadId),
    position: workerData * threadId,
  });
}
