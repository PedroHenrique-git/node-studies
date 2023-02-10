const redis = require("redis");

const client = redis.createClient();
const task = process.argv[2];

client.connect();

async function addTask(task) {
  const key = `Task: ${Math.random().toString(32).replace(".", "")}`;

  await client.set(key, task);

  await listTasks();
}

async function listTasks() {
  const keys = await client.keys("Task:*");
  const tasksPromise = keys.map((key) => client.get(key));
  const tasksValues = await Promise.allSettled(tasksPromise);

  console.table(tasksValues);

  await client.quit();
}

client.on("ready", () => {
  if (!task) {
    listTasks();
  } else {
    addTask(task);
  }
});
