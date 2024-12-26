const express = require('express');
const { getAppointmentsByUsername } = require('../controllers/appointmentController/fetch');
const { createAppointment } = require('../controllers/appointmentController/create');
const { updateAppointment } = require('../controllers/appointmentController/update');
const { deleteAppointment } = require('../controllers/appointmentController/delete');
const router = express.Router();

router.get('/', getAppointmentsByUsername);
router.post('/insert', createAppointment);
router.patch('/update:appointmentId', updateAppointment);
router.delete('/delete:appointmentId', deleteAppointment);

module.exports = router;
