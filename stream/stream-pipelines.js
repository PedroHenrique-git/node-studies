const fs = require("fs");
const { pipeline, Transform } = require("stream");
const path = require("path");
const { promisify } = require("util");

const filePath = path.join(__dirname, "file.txt");
const outputFilePath = path.join(__dirname, "output.txt");

const stat = promisify(fs.stat);

const uppercase = new Transform({
  transform(chunk, encoding, callback) {
    callback(null, chunk.toString().toUpperCase());
  },
});

pipeline(
  fs.createReadStream(filePath),
  uppercase,
  fs.createWriteStream(outputFilePath),
  (err) => {
    if (err) {
      console.error("Pipeline failed.", err);
    } else {
      console.info("Pipeline succeed.");
    }
  }
);

stat(filePath).then((data) => {
  console.log("data --> ", data);
});
