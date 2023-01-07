const fs = require("fs");
const { Transform } = require("stream");
const path = require("path");

const filePath = path.join(__dirname, "file.txt");
const outputPath = path.join(__dirname, "newFile.txt");

const rs = fs.createReadStream(filePath);
const ws = fs.createWriteStream(outputPath);

const uppercase = new Transform({
  transform(chunk, encoding, callback) {
    callback(null, chunk.toString().toUpperCase());
  },
});

class Uppercase extends Transform {
  constructor() {
    super();
  }

  _transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  }
}

rs.pipe(new Uppercase()).pipe(ws);
