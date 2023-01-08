const http = require("http");
const fs = require("fs");
const path = require("path");

const HOSTNAME = process.env.HOSTNAME ?? "0.0.0.0";
const PORT = process.env.PORT ?? 3000;

const indexPage = fs.readFileSync(path.join(__dirname, "index.html"));

function error(res, code) {
  res.statusCode = code;
  res.end(
    JSON.stringify({
      error: http.STATUS_CODES[code],
    })
  );
}

function todo(res) {
  res.end(
    JSON.stringify({
      task_id: 1,
      description: "Walk dog",
    })
  );
}

function index(res) {
  res.end(
    JSON.stringify({
      name: "todo-server",
    })
  );
}

function get(res) {
  res.writeHead(200, {
    "Content-type": "text/html",
  });
  res.end(indexPage);
}

function post(req, res) {
  if (req.headers["content-type"] !== "application/json") {
    error(415, res);
    return;
  }

  let input = "";

  req.on("data", (chunk) => {
    input += chunk.toString();
  });

  req.on("end", () => {
    const parsed = JSON.parse(input);

    if (parsed.err) {
      error(400, "Bad request", res);
      return;
    }

    console.log("Received data: ", parsed);
    res.end(JSON.stringify({ data: input }));
  });
}

const server = http.createServer((req, res) => {
  // if (req.method !== "GET") return error(res, 405);
  if (req.method === "POST") return post(req, res);
  if (req.url === "/form") return get(res);
  if (req.url === "/todo") return todo(res);
  if (req.url === "/") return index(res);
  error(res, 404);
});

server.listen(PORT, HOSTNAME, () => {
  console.log(`Server listening on port ${server.address().port}`);
});
