const { Router } = require("express");

const fetch = require("node-fetch");

const router = Router();

router.get("/", (req, res) => {
  fetch("http://localhost:3000/books")
    .then((res) => res.json())
    .then((json) => {
      res.render("inventory", { books: json });
    })
    .catch((err) => {
      res.render("error", {
        error: err,
        message: err.message,
      });
    });
});

router.post("/add", (req, res) => {
  fetch("http://localhost:3000/books", {
    method: "POST",
    body: JSON.stringify(req.body),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then(() => {
      res.redirect("/inventory");
    })
    .catch((err) => {
      res.render("error", {
        error: err,
        message: err.message,
      });
    });
});

module.exports = router;
