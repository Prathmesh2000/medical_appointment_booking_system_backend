const Appointment = require("../../models/appointmentModel");
const { missingParamResponse, serverErrorResponse, successResponse } = require("../../utils/apiFunction");
const verifyToken = require("../../utils/authMiddleware");
const { checkMissingParams } = require("../../utils/common");

exports.getAppointmentsByUsername = [
  verifyToken,  //JWT authentication middleware
  async (req, res) => {
    try {
      const { username } = req.query;

      const paramNames = ["username"];
      const missingParams = checkMissingParams({ username }, paramNames);
      if (missingParams) {
        return missingParamResponse(res, missingParams);
      }

      const appointments = await Appointment.find({ patientName: username })
        .populate('doctorId', 'name specialty');

      if (appointments.length === 0) {
        return successResponse(res, []);
      }

      return successResponse(res, appointments);
    } catch (err) {
      return serverErrorResponse(res, err);
    }
  }
];
