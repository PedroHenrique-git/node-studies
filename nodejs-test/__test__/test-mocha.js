const { add } = require("../calculator");

const assert = require("chai").assert;

describe("Calculator Test", () => {
  describe("add() Test", () => {
    it("add(1, 2) should return 3", () => {
      assert.equal(add(1, 2), 3);
    });

    it("add('1', '2') should return 3", () => {
      assert.equal(add("1", "2"), 3);
    });
  });
});
