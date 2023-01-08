const fs = require("fs");
const { stringify } = require("ndjson");
const { Transform } = require("stream");

const Name = new Transform({
  objectMode: true,
  transform: ({ forename, surname }, encoding, callback) => {
    callback(null, { name: forename + " " + surname });
  },
});

Name.pipe(stringify()).pipe(process.stdout);

Name.write({ forename: "John", surname: "Doe" });
Name.write({ forename: "Jane", surname: "Doe" });
