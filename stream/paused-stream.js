const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "file.txt");

const rs = fs.createReadStream(filePath);

rs.on("readable", () => {});

rs.on("end", () => console.log("No more data"));

let data = rs.read();

while (data !== null) {
  console.log("Read chunk: ", data);
  data = rs.read();
}
