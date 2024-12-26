const Appointment = require("../../models/appointmentModel");
const { createdResponse, serverErrorResponse, missingParamResponse, conflictResponse } = require("../../utils/apiFunction");
const verifyToken = require("../../utils/authMiddleware");
const { checkMissingParams } = require("../../utils/common");

exports.createAppointment = [
  verifyToken, //JWT authentication middleware
  async (req, res) => {
    try {
      const {
        doctorId = null,
        patientName = null,
        patientContact = null,
        date = null,
        timeSlot = null,
      } = req.body;
  
      const paramNames = ["doctorId", "patientName", "date", "timeSlot"];
      const missingParams = checkMissingParams({ doctorId, patientName, date, timeSlot }, paramNames);
  
      if (missingParams) {
        return missingParamResponse(res, missingParams);
      }
  
      // Check if the appointment is already booked
      const existingAppointment = await Appointment.findOne({ doctorId, date, timeSlot });
  
      if (existingAppointment) {
        return conflictResponse(res, {
          message: "The appointment is already booked for this doctor at the specified date and time.",
          data: existingAppointment,
        });
      }
  
      // Create a new appointment
      const newAppointment = new Appointment({
        doctorId,
        patientName,
        patientContact,
        date,
        timeSlot,
      });
  
      await newAppointment.save();
  
      return createdResponse(res, {
        message: "Appointment created successfully",
        data: newAppointment,
      });
    } catch (err) {
      return serverErrorResponse(res, err);
    }
  }
]
