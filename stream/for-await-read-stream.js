const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "file.txt");

const rs = fs.createReadStream(filePath);

async function run() {
  for await (const chunk of rs) {
    console.log("Read chunk: ", chunk);
  }
  console.log("No more data");
}

run();
