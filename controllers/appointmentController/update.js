const Appointment = require("../../models/appointmentModel");
const { notFoundResponse, successResponse, serverErrorResponse } = require("../../utils/apiFunction");
const verifyToken = require("../../utils/authMiddleware");

exports.updateAppointment = [
  verifyToken,
  async (req, res) => {
    try {
      let { appointmentId } = req.params; // Get appointmentId from URL params

      const { date = null, timeSlot = null } = req.body;

      const payload = {};
      if (date) payload["date"] = date;
      if (timeSlot) payload["timeSlot"] = timeSlot;

      const appointment = await Appointment.findByIdAndUpdate(
        appointmentId,
        payload,
        { new: true } // Return the updated document
      );

      if (!appointment) {
        return notFoundResponse(res, 'Appointment not found');
      }

      return successResponse(res, 'Appointment updated successfully');
    } catch (err) {
      return serverErrorResponse(res, err)
    }
  }
]
