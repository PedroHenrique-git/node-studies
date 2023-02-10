const { MongoClient } = require("mongodb");

const task = process.argv[2];

const URI = "mongodb://localhost:27017";

function addTask(client, collection) {
  collection.insertOne(
    {
      task,
    },
    (err) => {
      if (err) throw err;
      console.log("New task: ", task);
      listTasks(client, collection);
    }
  );
}

function listTasks(client, collection) {
  const data = collection.find().toArray();

  console.table(data);

  client.close();
}

MongoClient.connect(URI)
  .then((client) => {
    const db = client.db("tasklist");
    const collection = db.collection("tasks");

    if (task) {
      addTask(client, collection);
    } else {
      listTasks(client, collection);
    }
  })
  .catch((err) => {
    throw err;
  });
