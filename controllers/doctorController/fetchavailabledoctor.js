const Appointment = require('../../models/appointmentModel');
const Doctor = require('../../models/doctorModel');
const { successResponse, serverErrorResponse } = require('../../utils/apiFunction');

// Helper function to check doctor availability considering booked time slots
const checkDoctorAvailability = async (doctorId, date, timeSlot) => {
  const dayOfWeek = new Date(date).toLocaleString('en-us', { weekday: 'long' }); // Get the weekday (e.g., Monday, Tuesday)
  const doctor = await Doctor.findById(doctorId);
  
  // Check if the doctor is available on the given weekday
  if (doctor.availability && doctor.availability.get(dayOfWeek)) {
    const availableSlots = doctor.availability.get(dayOfWeek); // Array of available time slots (e.g., ['x', 'y', 'z'])

    // Fetch all appointments for the given doctor and date
    const appointments = await Appointment.find({
      doctorId: doctorId,
      date: date,
    }).select('timeSlot'); // Only select timeSlot field

    // Extract booked time slots
    const bookedSlots = appointments.map(appointment => appointment.timeSlot);

    // Filter available time slots by checking which ones are not booked
    const remainingAvailableSlots = availableSlots.filter(slot => !bookedSlots.includes(slot));

    // If no available slots, return false (doctor is not available)
    if (remainingAvailableSlots.length === 0) {
      return false;
    }

    // If timeSlot is provided, check if it matches any remaining available slots
    if (timeSlot) {
      return remainingAvailableSlots.includes(timeSlot);
    }
    
    // If no timeSlot is provided, return true if there are remaining available slots
    return remainingAvailableSlots.length > 0;
  }

  // If no availability for the day, return false
  return false;
};

// Controller function to get available doctors
const getAvailableDoctors = async (req, res) => {
  const { date, timeSlot } = req.query; // Get date, timeSlot from query params

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

    // Send the list of available doctors
    return successResponse(res, {
      doctors: availableDoctors,
      total: availableDoctors.length, // Total available doctors
    });
  } catch (err) {
    return serverErrorResponse(res, err);
  }
};

module.exports = {
  getAvailableDoctors,
};