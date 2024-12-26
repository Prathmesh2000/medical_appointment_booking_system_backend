// api/doctor.js
const express = require('express');
const doctorRoutes = require('../routes/doctorRoutes');
const connectToMongo = require('../config/db');
const cors = require('cors');  // Import the cors middleware
const app = express();
app.use(cors());  // Allow all origins

app.use(express.json());
connectToMongo();

// Mount doctor routes directly (no need to specify '/api/doctor', it's handled automatically by Vercel)
app.use(doctorRoutes);  // This will handle all /api/doctor/* routes

module.exports = (req, res) => app(req, res);  // Vercel handles this as a serverless function
