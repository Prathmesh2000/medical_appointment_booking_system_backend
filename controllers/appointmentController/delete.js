const Appointment = require("../../models/appointmentModel");
const { serverErrorResponse, successResponse, notFoundResponse } = require("../../utils/apiFunction");
const verifyToken = require("../../utils/authMiddleware");

exports.deleteAppointment = [
  verifyToken,
  async (req, res) => {
      try {
        let { appointmentId } = req.params; // Get appointmentId from URL params
          
        const appointment = await Appointment.findByIdAndDelete(appointmentId);
    
        if (!appointment) {
          return notFoundResponse(res, 'Appointment not found');
        }
    
        return successResponse(res, 'Appointment deleted successfully');
      } catch (err) {
        return serverErrorResponse(res, err);
      }
    }
]
  