const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
  const title = "Express with EJS";

  res.render("index", {
    title,
  });
});

module.exports = router;
