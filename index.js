const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const db = require("./src/db"); // Import the db module
const SSPCalculation = require("./src/SSPcalculation");

console.log("Server startup");

// Allow requests from specific origins
app.use(cors());

// Serve static files from the 'build' directory
app.use(express.static(path.join(__dirname, "kaya-react-frontend/build")));

// Serve index.html for any other requests
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.use(bodyParser.json());
// Endpoint to handle form submission
app.post("/submitForm", (req, res) => {

  const sspRes = SSPCalculation.calculateSSPScenario(req.body.question1,req.body.question2,req.body.question3);

  console.log(" ------ "+sspRes[0]);
  db.storeRestCallResult(
    req.header("x-forwarded-for"),
    JSON.stringify(req.body)
  );
  res.json({
    message: "Form submitted successfully!",
    calculatedSSP: sspRes[1],
    CO2Tons: sspRes[0],
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
