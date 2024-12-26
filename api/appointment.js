// api/appointment.js
const express = require('express');
const appointmentRoutes = require('../routes/appointmentRoutes');
const connectToMongo = require('../config/db');
const cors = require('cors');  // Import the cors middleware
const app = express();

app.use(cors());  // Allow all origins
app.use(express.json());
connectToMongo();

// Mount the appointment routes directly (no need to specify '/api/appointment', Vercel handles it automatically)
app.use(appointmentRoutes);  // This will handle all /api/appointment/* routes

module.exports = (req, res) => app(req, res);  // Vercel handles this as a serverless function
