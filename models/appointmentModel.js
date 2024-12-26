const mongoose = require('mongoose');
const { Schema } = mongoose;

const AppointmentSchema = new Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true,
  },
  patientName: {
    type: String,
    required: true,
  },
  patientContact: {
    type: String,
    required: false,
  },
  date: {
    type: String, // Format: YYYY-MM-DD
    required: true,
  },
  timeSlot: {
    type: String, // Format: HH:MM-HH:MM
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Appointment = mongoose.model('Appointment', AppointmentSchema);
module.exports = Appointment;