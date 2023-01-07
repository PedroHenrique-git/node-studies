const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "file.txt");

const rs = fs.createReadStream(filePath);

rs.pipe(process.stdout);
