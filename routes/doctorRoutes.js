const express = require('express');
const { getAvailableDoctors } = require('../controllers/doctorController/fetchavailabledoctor');
const { getAvailableDoctorSlots } = require('../controllers/doctorController/fetchdoctordata');
const router = express.Router();

// Define the route to fetch available doctors
router.get('/available', getAvailableDoctors);
router.get('/available-slots', getAvailableDoctorSlots);

module.exports = router;
