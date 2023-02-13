const express = require("express");
const session = require("express-session");
const { join } = require("path");
const helmet = require("helmet");

const index = require("./routes/index");
const auth = require("./routes/auth");

const app = express();

app.set("views", join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(helmet());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    name: "SESSIONID",
    secret: "Node Cookbook",
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/", index);
app.use("/auth", auth);

function asyncWork(callback) {
  setTimeout(callback, 0);
}

app.get("/pollution", (req, res) => {
  asyncWork(() => {
    const msgInQuery = req.query.msg;
    const msg = Array.isArray(msgInQuery) ? msgInQuery.at(-1) : msgInQuery;

    const upper = (msg ?? "").toUpperCase();
    res.send(upper);
  });
});

app.get("*", (req, res) => {
  return res.status(404).json({ message: "page not found" });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
