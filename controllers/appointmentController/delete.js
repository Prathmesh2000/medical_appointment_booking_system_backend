const Appointment = require("../../models/appointmentModel");
const { serverErrorResponse, successResponse, notFoundResponse } = require("../../utils/apiFunction");

exports.deleteAppointment = async (req, res) => {
    try {
      let { appointmentId } = req.params; // Get appointmentId from URL params
      appointmentId= appointmentId.replace(':', '');

      const appointment = await Appointment.findByIdAndDelete(appointmentId);
  
      if (!appointment) {
        return notFoundResponse(res, 'Appointment not found');
      }
  
      return successResponse(res, 'Appointment deleted successfully');
    } catch (err) {
      return serverErrorResponse(res, err);
    }
  };
  