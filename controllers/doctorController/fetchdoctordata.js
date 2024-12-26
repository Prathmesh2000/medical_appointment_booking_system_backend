const Doctor = require('../../models/doctorModel');
const Appointment = require('../../models/appointmentModel');
const { notFoundResponse, successResponse, serverErrorResponse } = require('../../utils/apiFunction');

// Controller function to get available doctor slots for a specific date
const getAvailableDoctorSlots = async (req, res) => {
  const { date, id } = req.query; // Get date and doctor id from query params
  try {
    // Fetch doctor data using the provided id
    const doctor = await Doctor.findById(id);
    if (!doctor) {
      return notFoundResponse(res, 'Doctor not found');
    }

    // Fetch all appointments for the given doctor on the specified date
    const existingAppointments = await Appointment.find({
      doctorId: id,
      date: date
    }).select('timeSlot'); // Only get time slots from appointments

    // Extract the booked time slots
    const bookedSlots = existingAppointments.map(appointment => appointment.timeSlot);
    const bookedSlotsArray = bookedSlots.map(appointment => appointment.timeSlot);
    const dayOfWeek = new Date(date).toLocaleString("en-US", { weekday: "long" });

    // Check if the doctor has availability for the day
    if (!doctor.availability || !doctor.availability.get(dayOfWeek)) {
        return notFoundResponse(res, `No availability for this doctor on ${dayOfWeek}.`)
    }

    const availableSlots = doctor.availability.get(dayOfWeek).filter(slot => !bookedSlotsArray.includes(slot));

    // Filter available slots based on the doctor's availability
    // const availableSlots = {};

    // // Loop through the doctor's availability (Map object) and check available slots for each day
    // doctor.availability.forEach((slots, day) => {
    //   // Filter out booked slots for each day
    //   const availableForDay = slots.filter(slot => !bookedSlotsArray.includes(slot));

    //   // If there are available slots for the day, add them to the result object
    //   if (availableForDay.length > 0) {
    //     availableSlots[day] = availableForDay;
    //   }
    // });

    // If no slots available for the given day, return an empty object
    if (Object.keys(availableSlots).length === 0) {
        return notFoundResponse(res, 'No available slots for the requested date')
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
