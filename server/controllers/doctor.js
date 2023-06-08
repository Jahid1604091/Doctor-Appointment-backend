import asyncHandler from "express-async-handler";
import { Doctor } from "../models/doctor.js";
import { Appointment } from "../models/Appointment.js";
import moment from "moment";


//private -> api/doctors/:id/
export const get_doctor_by_id = asyncHandler(async (req, res) => {
    const doctor = await Doctor.findById(req.params.id).populate('user');
    res.status(200).json(doctor);
});

//private -> api/doctors/check-availability
export const checkAvailability = asyncHandler(async (req, res) => {

    const { user, doctor, time, date } = req.body;
    const from_time = moment(time).subtract(1, 'hours');
    const to_time = moment(time).add(1, 'hours');

    //saved in DB as 6 hrs ahead than us
    const appointments = await Appointment.find({
        date:moment(date).format('YYYY-MM-DD'),
        doctor,
        $or:[
            {time: { $lt: time , $gt:from_time}},
            {time: { $gt: time, $lt: to_time }},

        ]
    });
    // res.json({ appointments })
    if (appointments.length === 0) {
        res.status(200).json({
            success: true,
            msg: 'Appointment available',
        })
    }
    else {
        res.status(400).json({
            success: false,
            msg: 'Appointment Not available',
        })

    }

});

