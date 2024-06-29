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
    result TEXT,
    SSP TEXT,
    browser_lang TEXT,
    facilitator TEXT
  )`);
  db.run(
    `CREATE TABLE IF NOT EXISTS EMAILS (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT)`
  );
});

// Function to store REST call result
function storeRestCallResult(ip, result, ssp, browser_lang, facilitator_id) {
  db.run(
    `INSERT INTO QUIZ_ANSWERS (ip, result, SSP, browser_lang, facilitator_id) VALUES (?, ?, ?,?,?)`,
    [ip, result, ssp, browser_lang, facilitator_id],
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
            ip+
            " --- browser lang "+
            browser_lang+
            " --- facilitator : " +
            facilitator_id
        );
      }
    }
  );
}

function fetchResultsGroupedBySSP(res) {
  db.all(
    "SELECT SSP, COUNT(*) as count FROM QUIZ_ANSWERS GROUP BY SSP",
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      // Transform rows to the desired format
      const formattedData = rows.map((row) => ({
        text: row.SSP,
        value: row.count,
      }));

      // Send the formatted data as JSON
      res.json(formattedData);
    }
  );
}

function fetchResultsDetails(res) {
  db.all("SELECT * FROM QUIZ_ANSWERS", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    // Send the formatted data as JSON
    res.json(rows);
  });
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

function fetchTotalVisits(res) {
  const totalVisitsQuery = "SELECT COUNT(*) AS total_visits FROM QUIZ_ANSWERS";
  const weeklyVisitsQuery = `
    SELECT 
        strftime('%Y-%W', qa.timestamp) AS week, 
        f.name AS facilitator,
        COUNT(*) AS weekly_visits
    FROM 
        quiz_answers qa
    JOIN 
        facilitators f ON qa.facilitator_id = f.id
    GROUP BY 
        week, facilitator
    ORDER BY 
        week, facilitator;`;

  // Execute the total visits query
  db.get(totalVisitsQuery, (err, totalVisitsRow) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    // Execute the weekly visits query
    db.all(weeklyVisitsQuery, (err, weeklyVisitsRows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      // Combine the results
      const result = {
        total_visits: totalVisitsRow.total_visits,
        weekly_visits: weeklyVisitsRows,
      };

      // Send the combined result
      res.json(result);
    });
  });
}

// Export functions
module.exports = {
  storeRestCallResult,
  storeEmail,
  fetchResultsGroupedBySSP,
  fetchResultsDetails,
  fetchTotalVisits,
};
