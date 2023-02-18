const benchmark = require("benchmark");
const suite = new benchmark.Suite();
const maxNumber = 100;

function sumOfSquares(maxNumber) {
  let sum = 0;

  for (let i = 0; i < maxNumber; i++) {
    sum += i ** 2;
  }

  return sum;
}

function printResults() {
  this.forEach((benchmark) => {
    console.log(benchmark.toString());
  });

  console.log("Fastest implementation is", this.filter("fastest")[0].name);
}

suite.add("slow", () => {
  sumOfSquares(maxNumber);
});

suite.on("complete", printResults);
suite.run();
