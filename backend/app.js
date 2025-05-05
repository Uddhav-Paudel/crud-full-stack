const express = require('express'); // Import Express for building the API
const app = express();
const { Pool } = require('pg'); // Import PostgreSQL client
const cors = require('cors'); // Import CORS for cross-origin requests
require('dotenv').config();
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS for all routes

// Connect to PostgreSQL using DATABASE_URL from environment variables
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
// Health check endpoint for Kubernetes probes and monitoring
app.get('/healthz', (req, res) => res.json({ status: 'ok' }));

// Get all users from the database
app.get('/users', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM users'); // Query the users table
  res.json(rows); // Send users as JSON
});

// Add a new user to the database
app.post('/users', async (req, res) => {
  const { name } = req.body; // Get name from request body
  // Insert user and return the new record
  const { rows } = await pool.query('INSERT INTO users(name) VALUES($1) RETURNING *', [name]);
  res.json(rows[0]); // Send the new user as JSON
});

module.exports = {app, pool};
