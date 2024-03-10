const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');

console.log("Server startup");

// Allow requests from specific origins
app.use(cors());

// Serve static files from the 'build' directory
app.use(express.static(path.join(__dirname, 'kaya-react-frontend/build')));

// Serve index.html for any other requests
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use(bodyParser.json());

// Endpoint to handle form submission
app.post('/submitForm', (req, res) => {
  const formData = req.body;
  // Handle the form data, e.g., save it to a database
  console.log('Form Data:', formData);
  res.json({ message: 'Form submitted successfully!' });
});

app.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
