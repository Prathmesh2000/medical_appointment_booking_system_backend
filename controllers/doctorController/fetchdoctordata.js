const Doctor = require('../../models/doctorModel');
const Appointment = require('../../models/appointmentModel');
const { notFoundResponse, successResponse, serverErrorResponse } = require('../../utils/apiFunction');

// Controller function to get available doctor slots for a specific date
const getAvailableDoctorSlots = async (req, res) => {
  const { date, id } = req.query; 
  try {
    // Fetch doctor data 
    const doctor = await Doctor.findById(id);
    if (!doctor) {
      return notFoundResponse(res, 'Doctor not found');
    }

    // Fetch all appointments for the given doctor on the specified date
    const existingAppointments = await Appointment.find({
      doctorId: id,
      date: date
    }).select('timeSlot'); 

    // Extract the booked time slots
    const bookedSlots = existingAppointments.map(appointment => appointment.timeSlot);
    
    // Get the day of the week (e.g., Monday, Tuesday)
    const dayOfWeek = new Date(date).toLocaleString("en-US", { weekday: "long" });

    // Check if the doctor has availability for the day
    if (!doctor.availability || !doctor.availability.get(dayOfWeek)) {
      return notFoundResponse(res, `No availability for this doctor on ${dayOfWeek}.`);
    }

    // Get the doctor's available time slots for the given day
    const availableSlots = doctor.availability.get(dayOfWeek).filter(slot => !bookedSlots.includes(slot));

    // If no slots are available for the given day, return a message
    if (availableSlots.length === 0) {
      return notFoundResponse(res, 'No available slots for the requested date');
    }

    // Send the doctor details along with available slots as response
    return successResponse(res, {
      doctor: {
        name: doctor.name,
        specialty: doctor.specialty,
        qualification: doctor.qualification,
        availableSlots
      }
    });

  } catch (err) {
    return serverErrorResponse(res, err);
  }
};

module.exports = {
  getAvailableDoctorSlots
};
