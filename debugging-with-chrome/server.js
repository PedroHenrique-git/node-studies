const express = require("express");
const app = express();
const random = require("./random");

app.get("/:number", (req, res) => {
  const n = req.params.number;
  res.send(random(n).toString());
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
