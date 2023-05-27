import asyncHandler from "express-async-handler";
import { Doctor } from "../models/doctor.js";

//private -> api/doctors/:id/
export const get_doctor_by_id = asyncHandler(async (req, res) => {
    const doctor = await Doctor.findById(req.params.id).populate('user');
    res.status(200).json(doctor);
});

//private -> api/users/check-availability
export const checkAvailability = asyncHandler(async (req, res) => {

    const {date,from_time,to_time} = req.body;


});

