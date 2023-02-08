const Router = require("koa-router");

const title = "Koa.js";
const router = new Router();

/*
router.get("/", async function (ctx) {
  ctx.body = `
        <html>
            <head>
                <title> ${title} </title>
                <link rel="stylesheet" href="styles.css"></head>
            <body>
                <h1> ${title} </h1>
                <p> Welcome to ${title} </p>
            </body>
        </html>
    `;
});
*/

router.get("/", async function (ctx) {
  ctx.state = {
    title,
  };

  await ctx.render("index");
});

module.exports = router;
