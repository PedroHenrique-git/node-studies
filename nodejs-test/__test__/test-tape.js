const test = require("tape");
const { add } = require("../calculator");

test("test add integers 1 and 2", (t) => {
  t.plan(1);
  t.equal(add(1, 2), 3);
});

test("test add integers 1 and 2", (t) => {
  t.plan(1);
  t.equal(add("1", "2"), 3);
});
