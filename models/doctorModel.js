const mongoose = require('mongoose');
const { Schema } = mongoose;

const DoctorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  specialty: {
    type: String,
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  availability: {
    type: Map,
    of: [String], // Example: {"Monday": ["9:00-10:00", "10:00-11:00"]}
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a model based on the schema
const Doctor = mongoose.model('Doctor', DoctorSchema);
module.exports = Doctor;
