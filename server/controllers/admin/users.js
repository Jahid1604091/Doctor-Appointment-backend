import asyncHandler from "express-async-handler";
import { User } from "../../models/user.js";
import { Doctor } from "../../models/doctor.js";

//private by admin -> api/admin/users
export const get_all_users = asyncHandler(async (req, res) => {
    const users = await User.find({role : 'user'});
    res.status(200).json(users);
});

//private by admin -> api/admin/doctors
export const get_all_doctors = asyncHandler(async (req, res) => {
    const doctors = await Doctor.find({});
    res.status(200).json(doctors);
});