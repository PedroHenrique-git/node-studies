const levelup = require("levelup");
const leveldown = require("leveldown");

const db = levelup(leveldown("./data"));

const task = process.argv[2];

const operations = [
  { type: "put", key: "forename", value: "Beth" },
  { type: "put", key: "surname", value: "Gringgs" },
];

db.batch(operations, function (err) {
  if (err) return console.log(err);
  console.log("Bath operations complete");
});

db.batch()
  .put("forename", "Beth")
  .put("surname", "Gringgs")
  .write(() => console.log("Batch operations complete."));

db.createReadStream({
  gte: "Task:1",
  lte: "Task:3",
}).on("data", function (data) {
  console.log(data.key.toString());
});

function listTasks() {
  db.createReadStream().on("data", (data) => {
    console.log(data.key.toString(), "=", data.value.toString());
  });
}

function addTask() {
  const key = `Task: ${Math.random().toString(32).replace(".", "")}`;

  db.put(key, task, (err) => {
    if (err) throw err;
    listTasks();
  });
}

if (!task) {
  listTasks();
} else {
  addTask();
}
