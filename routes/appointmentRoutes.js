const express = require('express');
const { getAppointmentsByUsername } = require('../controllers/appointmentController/fetch');
const { createAppointment } = require('../controllers/appointmentController/create');
const { updateAppointment } = require('../controllers/appointmentController/update');
const { deleteAppointment } = require('../controllers/appointmentController/delete');
const router = express.Router();

// Get all appointments for a specific username
router.get('/', getAppointmentsByUsername);

// Create a new appointment
router.post('/insert', createAppointment);

// Update an appointment by appointmentId
router.patch('/update/:appointmentId', updateAppointment);  // Corrected with ':' for parameter

// Delete an appointment by appointmentId
router.delete('/delete/:appointmentId', deleteAppointment);  // Corrected with ':' for parameter

module.exports = router;
