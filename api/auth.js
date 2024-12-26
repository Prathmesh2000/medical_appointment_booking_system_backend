// api/auth.js
const express = require('express');
const authRoutes = require('../routes/authRoutes');
const connectToMongo = require('../config/db');
const cors = require('cors');  // Import the cors middleware

const app = express();
app.use(cors());  // Allow all origins
app.use(express.json());

connectToMongo();

// Mount auth routes directly (no need to specify '/api/auth', it's handled automatically by Vercel)
app.use(authRoutes);  // This will handle all /api/auth/* routes

module.exports = (req, res) => app(req, res);  // Vercel handles this as a serverless function
