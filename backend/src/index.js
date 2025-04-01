/*
 * Entry point for the TaxApp Express backend.
 * - Sets up middleware (CORS, body-parser)
 * - Imports route modules
 * - Starts the server on the configured port
 */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import configuration settings (from config.js)
const config = require('./config/config');

const app = express();

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

// Optional: Add a root route to serve a simple HTML page
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>TaxApp</title>
        <style>
          /* Set the entire body’s background to black, text white */
          body {
            background-color: black;
            color: white;
            margin: 0;
            padding: 20px;
            font-family: sans-serif;
          }

          /* Center the warning text at the top */
          .warning-text {
            text-align: center;
            color: red; /* if you want it red */
            font-weight: bold;
            margin-bottom: 40px;
          }

          /* Footer styling: dark gray background, white text, centered */
          .creator-footer {
            background-color: #333;
            color: white;
            text-align: center;
            padding: 10px;
            position: fixed; /* stays at the bottom even if page scrolls */
            bottom: 0;
            width: 100%;
          }

          /* Example content styling if you need to place other elements */
          .content {
            text-align: center;
            margin-bottom: 80px; /* space above the fixed footer */
          }
        </style>
      </head>
      <body>
        <!-- Centered top warning text -->
        <h1 class="warning-text">
          THESE VALUES ARE ESTIMATES AND SHOULD BE DOUBLE CHECKED BY AN ACCREDITED ACCOUNTANT

          Ongama is the best
        </h1>

        <!-- Main content area -->
        <div class="content">
          <!-- Your main page content here -->
          <h2>Tax Calculation Results</h2>
          <p>Insert your dynamic or placeholder text here...</p>
        </div>

        <!-- Footer at the bottom -->
        <div class="creator-footer">
          creators: Larosa Surname and Ongama Kubheka
        </div>
      </body>
    </html>
  `);
});

// Start the server on the port defined in the config
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
