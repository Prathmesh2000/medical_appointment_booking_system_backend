const Doctor = require("../../models/doctorModel");
const { serverErrorResponse, successResponse } = require("../../utils/apiFunction");

const getAvailableDoctors = async (req, res) => {
  const { date, timeSlot } = req.query;
  const dayOfWeek = new Date(date).toLocaleString('en-us', { weekday: 'long' });

  try {
    const availableDoctors = await Doctor.aggregate([
      {
        $match: {
          [`availability.${dayOfWeek}`]: { $exists: true },
        },
      },
      {
        $lookup: {
          from: 'appointments',
          localField: '_id',
          foreignField: 'doctorId',
          pipeline: [
            {
              $match: {
                date: date,
              },
            },
            {
              $project: { timeSlot: 1 }, 
            },
          ],
          as: 'appointments', 
        },
      },
      {
        $addFields: {
          availableSlots: {
            $setDifference: [
              `$availability.${dayOfWeek}`,
              { $map: { input: '$appointments', as: 'appointment', in: '$$appointment.timeSlot' } },
            ],
          },
        },
      },
      {
        $match: {
          availableSlots: { $ne: [] }, 
        },
      },
      {
        $project: {
          id: '$_id',
          name: 1,
          specialty: 1,
          qualification: 1,
          availability: 1,
          availableSlots: 1,
        },
      },
    ]);

    const filteredDoctors = availableDoctors.filter(doctor => {
      if (timeSlot) {
        return doctor.availableSlots.includes(timeSlot);
      }
      return true;
    });

    return successResponse(res, {
      doctors: filteredDoctors,
      total: filteredDoctors.length,
    });
  } catch (err) {
    return serverErrorResponse(res, err);
  }
};

module.exports = {
  getAvailableDoctors,
};
