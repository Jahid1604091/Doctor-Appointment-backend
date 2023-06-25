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

    const { user, doctor,date, time } = req.body;

    // const {  } = req.query;
    
    
    const from_time = moment(time,'hh:mm').subtract(10, 'minutes').toISOString();
    const to_time = moment(time,"hh:mm").add(10, 'minutes').toISOString();


    const appointments = await Appointment.find({
        //doctor and user id
        date: moment(date).format('DD-MM-YYYY'),
        time: { $gt: from_time, $lt: to_time }
    });

    //saved in DB as 2 hrs ahead than us
    if (appointments.length === 0) {
        res.status(200).json({
            success: true,
            msg: 'Can Appoint Now',
        })
    }
    else {
        res.status(400).json({
            success: false,
            msg: 'Can Not Appoint On This Time',
        })

    }

});

