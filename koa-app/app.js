const path = require("path");

const Koa = require("koa");
const serve = require("koa-static");
const Router = require("koa-router");
const views = require("koa-views");
const index = require("./routers/index");

const PORT = process.env.PORT ?? 3000;

const app = new Koa();
const router = new Router();

app.use(serve(path.join(__dirname, "public")));

app.use(views(path.join(__dirname, "views"), { extension: "ejs" }));

app.use(async (ctx, next) => {
  console.log("First middle start");
  await next();
  console.log("First middle return");
});

app.use(async (ctx, next) => {
  console.log("Second middle start");
  await next();
  console.log("Second middle return");
});

app.use(async (ctx, next) => {
  console.log("Third middle start");
  await next();
  console.log("Third middle return");
});

router.use("/", index.routes());
app.use(router.routes());

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
