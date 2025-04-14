const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const db = require("./src/db"); // Import the db module
const SSPCalculation = require("./src/SSPcalculation");

const app = express();

// log performance
app.use((req, res, next) => {
  const start = Date.now();

  // Capture when a static file is served
  const originalSendFile = res.sendFile;
  res.sendFile = function (...args) {
    res.locals.servedFile = args[0]; // Store file path
    return originalSendFile.apply(res, args);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    const logLine = `${new Date().toISOString()} ${req.method} ${req.originalUrl} ${
      res.statusCode
    } - ${duration}ms${res.locals.servedFile ? ` [file: ${res.locals.servedFile}]` : ""}\n`;

    console.log(logLine.trim());
  });

  next();
});

const PORT = process.env.PORT || 5000;


console.log("Server startup");

// Allow requests from specific origins
app.use(cors());

// Serve static files from the 'build' directory
app.use(express.static(path.join(__dirname, "kaya-react-frontend/build"), {
  maxAge: '1d',
}));


// Parse JSON bodies
app.use(express.json());


// API routes
app.post("/api/submitForm", (req, res) => {
  const sspRes = SSPCalculation.calculateSSPScenario(
    req.body.question1,
    req.body.question2,
    req.body.question3
  );

  const {
    facilitator_id,
    session_id,
    session_type = 0, // default if missing
    language = "en", // optional
  } = req.body;

  const ip = req.header("x-forwarded-for") || req.connection.remoteAddress;

  db.storeRestCallResult(
    ip,
    JSON.stringify({
      question1: req.body.question1,
      question2: req.body.question2,
      question3: req.body.question3,
      language: req.body.language,
    }),
    sspRes[1],
    language,
    facilitator_id,
    session_id,
    session_type
  );

  res.json({
    CO2Tons: sspRes[0],
    calculatedSSP: sspRes[1],
  });
});

app.get("/api/groupResults", (req, res) => {
  db.fetchResultsGroupedBySSP(res);
});

app.get("/api/resultsDetails", (req, res) => {
  db.fetchResultsDetails(res);
});

app.get("/api/sessionResults", (req, res) => {
  const sessionId = req.query.sessionId;

  if (!sessionId) {
    return res.status(400).json({ error: "Session ID is required" });
  }

  db.fetchResultsBySession(sessionId, res);
});

app.get("/api/total-visits", (req, res) => {
  db.fetchTotalVisits(res);
});

// Add this route to fetch the last three sessions for a facilitator
app.get("/api/lastSessions", (req, res) => {
  const facilitatorId = req.query.facilitatorId;

  if (!facilitatorId) {
    return res.status(400).json({ error: "Facilitator ID is required" });
  }

  db.fetchLastSessions(facilitatorId, res);
});

app.get("/api/kaya_materials", (req, res) => {
  const directoryPath = path.join(
    __dirname,
    "kaya-react-frontend/public/kaya_material"
  );
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).send("Unable to scan directory: " + err);
    }

    const fileLinks = files.map((file) => ({
      name: file,
      url: `/kaya_material/${file}`,
    }));

    res.json(fileLinks);
  });
});

app.post("/api/submitEmail", (req, res) => {
  const email = req.body.email;
  console.log("Email ---- " + email);
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }
  db.storeEmail(email);
});

// Serve index.html for all non-API routes (React Router handling)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "kaya-react-frontend/build", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
