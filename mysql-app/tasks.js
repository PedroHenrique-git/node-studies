require("dotenv").config();

const mysql = require("mysql2");

const db = mysql.createConnection({
  user: process.env.DB_MYSQL_USER,
  password: process.env.DB_MYSQL_PASSWORD,
});

db.query("CREATE DATABASE IF NOT EXISTS tasks");
db.query("USE tasks");

db.query(`
    CREATE TABLE IF NOT EXISTS tasks (
        id INT NOT NULL AUTO_INCREMENT,
        task TEXT NOT NULL,
        PRIMARY KEY (id)
    );
`);

db.query(`
    INSERT INTO tasks(task) VALUES ("Walk the dog.");
`);

db.query(
  `
    INSERT INTO tasks(task) VALUES (?);
`,
  process.argv[2]
);

db.query(
  `
    SELECT *  FROM tasks
`,
  (err, result, fields) => {
    console.table(result);
    db.end();
  }
);
