const sqlite3 = require('sqlite3').verbose();

const logger = (message) => {
    console.log('[SQLite]', message);
  };

// Open SQLite database
const db = new sqlite3.Database('kaya.db',{ verbose: logger });

// Create a table to store REST call results
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS QUIZ_ANSWERS (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    ip TEXT,
    result TEXT
  )`);
});

// Function to store REST call result
function storeRestCallResult(ip, result) {
  db.run(`INSERT INTO QUIZ_ANSWERS (ip, result) VALUES (?, ?)`, [ip, result], function(err) {
    if (err) {
      console.error('Error storing quiz result:', err);
    } else {
      console.log('Stored quiz result with id'+this.lastID+' and content '+result+' --- IP : '+ip);
    }
  });
}

// Export functions
module.exports = {
  storeRestCallResult
};
