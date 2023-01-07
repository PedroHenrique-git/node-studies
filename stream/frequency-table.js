const fs = require("fs");
const readline = require("readline");
const path = require("path");

const filePath = path.resolve(__dirname, "frequency_table.txt");
const rs = fs.createReadStream(filePath, { encoding: "utf-8" });

const rl = readline.createInterface({
  input: rs,
});

const frequency = {};
const matrix = [];

rl.on("line", (data) => {
  const cells = data.split(" ");
  matrix.push(cells);
});

rl.on("close", () => {
  const amount = matrix.length * matrix[0].length;
  const flatMatrix = matrix.flatMap((arr) => arr.map((val) => Number(val)));
  const quantityOfClasses = Math.ceil(1 + 3.3 * Math.log10(amount));
  const ranges = [];

  const min = Math.min(...flatMatrix) - 1;
  const max = Math.max(...flatMatrix) + 1;

  const amp = Math.floor((max - min) / quantityOfClasses);

  let start = min;

  for (let i = 0; i < quantityOfClasses; i++) {
    ranges.push([start, start + amp]);
    start += amp;
  }

  for (const [min, max] of ranges) {
    const key = `${min} |- ${max}`;

    frequency[key] = 0;

    for (const number of flatMatrix) {
      if (number >= min && number < max) {
        frequency[key]++;
      }
    }
  }

  frequency["Total"] = amount;

  console.table(frequency);
});
