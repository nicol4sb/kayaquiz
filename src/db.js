const sqlite3 = require("sqlite3").verbose();

const logger = (message) => {
  console.log("[SQLite]", message);
};

// Open SQLite database
const db = new sqlite3.Database("kaya.db", { verbose: logger });

// Initialize tables if necessary
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS QUIZ_ANSWERS (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    ip TEXT,
    result TEXT
  )`);
  db.run(
    `CREATE TABLE IF NOT EXISTS EMAILS (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT)`
  );
});

// Function to store REST call result
function storeRestCallResult(ip, result) {
  db.run(
    `INSERT INTO QUIZ_ANSWERS (ip, result) VALUES (?, ?)`,
    [ip, result],
    function (err) {
      if (err) {
        console.error("Error storing quiz result:", err);
      } else {
        console.log(
          "Stored quiz result with id" +
            this.lastID +
            " and content " +
            result +
            " --- IP : " +
            ip
        );
      }
    }
  );
}


function storeEmail(email) {
  db.run("INSERT INTO EMAILS (email) VALUES (?)", [email], function (err) {
    if (err) {
      console.error(err.message);
      return " error: Failed to store email ";
    }
    console.log(`Stored email with ID ${this.lastID} and email ` + email);
    return { message: "Email stored successfully" };
  });
}

// Export functions
module.exports = {
  storeRestCallResult,
  storeEmail,
};