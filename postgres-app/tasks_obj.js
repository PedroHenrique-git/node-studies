require("dotenv").config();

const pg = require("pg");
const db = new pg.Client({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

const task = process.argv[2];

const CREATE_TABLE_SQL = `
    CREATE TABLE IF NOT EXISTS tasks_docs (
        id SERIAL, 
        doc jsonb
    );
`;

const INSERT_TASK_SQL = `
    INSERT INTO tasks_doc (doc) VALUES ($1);
`;

const GET_TASKS_SQL = `SELECT * FROM tasks_doc`;

function listTasks() {
  db.query(GET_TASKS_SQL, (err, results) => {
    if (err) throw err;
    console.log(results.rows);
    db.end();
  });
}

db.connect((err) => {
  if (err) throw err;

  db.query(CREATE_TABLE_SQL, (err) => {
    if (err) throw err;

    if (task) {
      db.query(INSERT_TASK_SQL, [task], (err) => {
        if (err) throw err;
        listTasks();
      });
    } else {
      listTasks();
    }
  });
});
