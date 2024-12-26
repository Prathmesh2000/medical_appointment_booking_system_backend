const Appointment = require('../../models/appointmentModel');
const Doctor = require('../../models/doctorModel');
const { successResponse, serverErrorResponse } = require('../../utils/apiFunction');

// Controller function to get available doctors
const getAvailableDoctors = async (req, res) => {
  const { date, timeSlot } = req.query; // Get date, timeSlot, page, and limit from query params

  try {
    // Fetch all doctors
    const doctors = await Doctor.find();
    
    const availableDoctors = [];
    
    // Check each doctor for availability
    for (const doctor of doctors) {
      const isDoctorAvailable = await checkDoctorAvailability(doctor._id, date, timeSlot);
      
      // Only add the doctor if available
      if (isDoctorAvailable) {
        availableDoctors.push({
          id: doctor._id,
          name: doctor.name,
          specialty: doctor.specialty,
          qualification: doctor.qualification,
          availability: doctor.availability,
        });
      }
    }

    // Apply pagination

    // Send the paginated list of available doctors
    return successResponse(res, {
      doctors: availableDoctors,
      total: availableDoctors.length, // Total available doctors
    })
  } catch (err) {
    return serverErrorResponse(res, err);
  }
};

// Helper function to check doctor availability without considering timeSlot
const checkDoctorAvailability = async (doctorId, date, timeSlot) => {
  // Check if the doctor is available on the given date
  const dayOfWeek = new Date(date).toLocaleString('en-us', { weekday: 'long' }); // Get the weekday (e.g., Monday, Tuesday)
  // Get doctor's availability for that day
  const doctor = await Doctor.findById(doctorId);
  // console.log(doctor.availability, "availabilityavailability", doctor.availability[dayOfWeek])
  if (doctor.availability && doctor.availability.get(dayOfWeek)) {
    // If timeSlot is provided, check if it matches any available slots
    if (timeSlot) {
      return doctor.availability.get(dayOfWeek).includes(timeSlot);
    }
    // If no timeSlot is provided, return true if the doctor is available on the day
    return true;
  }
  
  // If no availability for the day, return false
  return false;
};

module.exports = {
  getAvailableDoctors,
};
