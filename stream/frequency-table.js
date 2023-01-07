const fs = require("fs");
const readline = require("readline");

const fileName = process.argv[2];
const rs = fs.createReadStream(fileName, { encoding: "utf-8" });

const rl = readline.createInterface({
  input: rs,
});

const frequency = {};

rl.on("line", (data) => {
  const cells = data.split(" ");

  for (const cell of cells) {
    if (cell in frequency) {
      frequency[cell]++;
    } else {
      frequency[cell] = 1;
    }
  }
});

rl.on("close", () => {
  console.table(frequency);
});
