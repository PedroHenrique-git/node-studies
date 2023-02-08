const { Router } = require("express");
const router = Router();

const title = "Express with EJS";

router.get("/", (req, res) => {
  res.render("index", {
    title,
  });
});

router.get("/:name?", (req, res) => {
  const name = req.params.name;

  res.send(`
    <html>
      <head>
        <title> ${title} </title>
        <link rel="stylesheet" href="styles.css">
      </head>
      <body>
        <h1> ${title} </h1>
        <p> Welcome to ${title}${name ? `, ${name}.` : ""} </p>
        <form method=POST action=data>
          Name: <input name=name><input type=submit>
        </form>
      </body>
    </html> 
  `);
});

router.post("/data", (req, res) => {
  res.redirect(`/${req.body.name}`);
});

module.exports = router;
