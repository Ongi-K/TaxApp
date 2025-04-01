/*
 * Entry point for the TaxApp Express backend.
 * - Sets up middleware (CORS, body-parser)
 * - Imports route modules
 * - Starts the server on the configured port
 */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config/config');

// Add this block now:
const path = require('path');
const fs = require('fs');

// Ensure the uploads folder exists
if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

// Import configuration settings (from config.js)


const app = express();

const uploadRoutes = require('./routes/upload');

// Enable Cross-Origin Resource Sharing
app.use(cors());
// Parse incoming JSON requests
app.use(bodyParser.json());

// Import routes for authentication and tax calculations
const authRoutes = require('./routes/auth');
const taxRoutes = require('./routes/tax');

// Mount the routes on specific paths
app.use('/api/auth', authRoutes);
app.use('/api/tax', taxRoutes);
app.use('/upload', uploadRoutes);


// Optional: Add a root route to serve a simple HTML page
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>TaxApp</title>
        <style>
          body {
            background-color: black;
            color: white;
            margin: 0;
            padding: 0;
            font-family: sans-serif;
          }
          nav {
            background-color: #222;
            padding: 15px;
            text-align: center;
          }
          nav a {
            color: white;
            margin: 0 20px;
            text-decoration: none;
            font-weight: bold;
            font-size: 18px;
          }
          .warning-text {
            text-align: center;
            color: red;
            font-weight: bold;
            margin: 40px 0;
          }
          .content {
            text-align: center;
            margin-bottom: 100px;
          }
          .creator-footer {
            background-color: #333;
            color: white;
            text-align: center;
            padding: 10px;
            position: fixed;
            bottom: 0;
            width: 100%;
          }
        </style>
      </head>
      <body>
        <nav>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/upload">Upload</a> <!-- Add this line -->
        </nav>


        <h1 class="warning-text">
          THESE VALUES ARE ESTIMATES AND SHOULD BE DOUBLE CHECKED BY AN ACCREDITED ACCOUNTANT
        </h1>

        <div class="content">
          <h2>Tax Calculation Results</h2>
          <p>Insert your dynamic or placeholder text here...</p>
        </div>

        <div class="creator-footer">
          creators: Larosa Surname and Ongama Kubheka
        </div>
      </body>
    </html>
  `);
});



// Add an "About" page route below your existing root route
app.get('/about', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>About - TaxApp</title>
        <style>
          body {
            background-color: black;
            color: white;
            margin: 0;
            padding: 20px;
            font-family: sans-serif;
          }
          .content {
            text-align: center;
            margin-top: 50px;
          }
        </style>
      </head>
      <body>
        <div class="content">
          <h1>About TaxApp</h1>
          <p>TaxApp is a web-based platform designed to help you securely calculate your taxes, track multiple income types, and export your results for easy sharing.</p>
        </div>
      </body>
    </html>
  `);
});



// Start the server on the port defined in the config
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
