const fs = require("fs");
const http = require("http");
const path = require("path");

const form = fs.readFileSync(path.join(__dirname, "public", "form.html"));

const formidable = require("formidable");

const get = (res) => {
  res.writeHead(200, {
    "Content-type": "text/html",
  });

  res.end(form);
};

const post = (req, res) => {
  if (!/multipart\/form-data/.test(req.headers["content-type"])) {
    return error(405, res);
  }

  const form = formidable({
    multiples: true,
    uploadDir: "./uploads",
  });

  form.parse(req, (err, fields, files) => {
    if (err) return err;

    res.writeHead(200, {
      "Content-type": "application/json",
    });

    res.end(JSON.stringify({ fields, files }));
  });
};

const error = (code, res) => {
  res.statusCode = code;
  res.end(http.STATUS_CODES[code]);
};

http
  .createServer((req, res) => {
    if (req.method === "GET") {
      return get(res);
    }

    if (req.method === "POST") {
      return post(req, res);
    }

    error(405, res);
  })
  .listen(3000);
