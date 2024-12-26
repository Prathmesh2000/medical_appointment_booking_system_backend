const Appointment = require("../../models/appointmentModel");
const { missingParamResponse, serverErrorResponse, successResponse } = require("../../utils/apiFunction");
const { checkMissingParams } = require("../../utils/common");

exports.getAppointmentsByUsername = async (req, res) => {
  try {
    const { username } = req.query; // Assuming the username is passed as a URL parameter

    const paramNames = ["username"];
    const missingParams = checkMissingParams({username}, paramNames);
    if(missingParams){
        return missingParamResponse(res, missingParams)
    }

    const appointments = await Appointment.find({ patientName: username })
      .populate('doctorId', 'name specialty'); // Populate the doctor info

    if (appointments.length === 0) {
        return successResponse(res, [])
    }

    return successResponse(res, appointments)
  } catch (err) {
    return serverErrorResponse(res, err);
  }
};
