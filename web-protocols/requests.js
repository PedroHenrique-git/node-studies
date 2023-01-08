const http = require("http");

/*
    http.get("http://www.google.com/", (res) => {
    res.pipe(process.stdout);
    });
*/

const payload = JSON.stringify({
  name: "Beth",
  job: "Software Engineer",
});

const opts = {
  method: "POST",
  host: "postman-echo.com",
  path: "/post",
  headers: {
    "Content-type": "application/json",
    "Content-Length": Buffer.byteLength(payload),
  },
};

const req = http.request(opts, (res) => {
  process.stdout.write("Status Code: " + res.statusCode + "\n");
  process.stdout.write("Body: ");
  res.pipe(process.stdout);
});

req.on("error", (err) => console.error("Error: ", err));

req.end(payload);
