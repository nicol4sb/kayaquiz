const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const db = require("./src/db"); // Import the db module
const SSPCalculation = require("./src/SSPcalculation");

const sqlite3 = require("sqlite3").verbose();

console.log("Server startup");

// Allow requests from specific origins
app.use(cors());

// Serve static files from the 'build' directory
app.use(express.static(path.join(__dirname, "kaya-react-frontend/build")));

// Serve index.html for any other requests
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "kaya-react-frontend/build", "index.html"));
});

app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "kaya-react-frontend/build", "index.html"));
});


app.use(express.json());
// Endpoint to handle form submission
app.post("/api/submitForm", (req, res) => {
  const sspRes = SSPCalculation.calculateSSPScenario(
    req.body.question1,
    req.body.question2,
    req.body.question3
  );

  db.storeRestCallResult(
    req.header("x-forwarded-for"),
    JSON.stringify(req.body),
    sspRes[1]
  );
  res.json({
    CO2Tons: sspRes[0],
    calculatedSSP: sspRes[1],
  });
});

app.get("/api/groupResults", (req, res) => {
  db.fetchRollingResultsFromLastHour(res); //  '[{ "text": "SSP1-1.9", "value": 3 },{ "text": "SSP1-2.6", "value": 2 },]'
});

app.post("/api/submitEmail", (req, res) => {
  const email = req.body.email;
  console.log("Email ---- " + email);
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }
  db.storeEmail(email);
});

// if somehow a react route is called - will result in a 404 - best approach is to redirect to /
app.use((req, res, next) => {
  res.status(404).redirect("/");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
