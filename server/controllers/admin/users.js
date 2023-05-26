import asyncHandler from "express-async-handler";
import { User } from "../../models/user.js";
import { Doctor } from "../../models/doctor.js";

//private by admin -> api/admin/users
export const get_all_users = asyncHandler(async (req, res) => {
    const users = await User.find({role : 'user', isDoctor:false});
    res.status(200).json(users);
});

//private by admin -> api/admin/doctors
export const get_all_doctors = asyncHandler(async (req, res) => {
    const doctors = await Doctor.find({});
    res.status(200).json(doctors);
});

//@todo private by admin -> api/admin/approve-all-as-doctor


//private by admin -> api/admin/approve-as-doctor/:id
export const approveAsDoctor = asyncHandler(async (req, res) => {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id,{status:'approved'});

    //send approval notification to the doctor
    const user = await User.findById(doctor.userId);
    const unseenNotifications = user.unseenNotifications;

    unseenNotifications.push({
        type: 'doctor-approval',
        message: `Your application for doctor is approved!`,
    });
    user.isDoctor = true;

    await user.save();
    res.status(200).json({success:true});
});