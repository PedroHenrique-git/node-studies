const express = require("express");
const session = require("express-session");
const { join } = require("path");
const helmet = require("helmet");
const Ajv = require("ajv");
const he = require("he");

const ajv = new Ajv();

const schema = {
  title: "Greeting",
  properties: {
    msg: { type: "string" },
    name: { type: "string" },
  },
  additionalProperties: false,
  required: ["msg"],
};

const validate = ajv.compile(schema);

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

app.post("/json-pollution", (req, res) => {
  if (!validate(req.body, schema)) {
    return res.end("");
  }

  const { msg, name } = req.body;

  if (name) {
    return res.end(`${msg} ${name}`);
  }

  return res.end(msg);
});

function getServiceStatus(callback) {
  const status = "All systems are running";
  callback(status);
}

app.get("/xss", (req, res) => {
  const { previous, lang, token } = req.query;

  getServiceStatus((status) => {
    const href = he.encode(`${previous}${token}/${lang}`);

    res.send(`
      <h1>Service status</h1>
      <div id="status">
        ${status}
      </div>
      <div>
        <a href="${href}">Back</a>
      </div>
    `);
  });
});

app.get("*", (req, res) => {
  return res.status(404).json({ message: "page not found" });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
