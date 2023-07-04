import asyncHandler from "express-async-handler";
import { Doctor } from "../../models/Doctor.js";
import { UserDetails } from "../../models/UserDetails.js";
import { Appointment } from "../../models/Appointment.js";


//private by admin -> api/admin/users
export const get_all_users = asyncHandler(async (req, res) => {
    const users = await UserDetails.find({ role: 'user' });
    res.status(200).json(users);
});

//private by admin -> api/admin/users/:id
export const deleteUser = asyncHandler(async (req, res) => {
    const user = await UserDetails.findById(req.params.id);
    const doctor = await Doctor.findOne({ user: req.params.id });
    await Appointment.deleteMany({
        $or: [
            { user: req.params.id }, { doctor: doctor._id }
        ]
    }
    );
    await doctor.deleteOne();
    await user.deleteOne();

    res.status(200).json({ success: true });
});

//private by admin -> api/admin/doctors?userId=64.......cf
//In profile you can get the doctors details by userId
export const get_all_doctors = asyncHandler(async (req, res) => {
    const userId = req.query.userId;

    // const doctors = await Doctor.find({},{createdAt:0,updatedAt:0,__v:0}).populate({path:'user',select:'name -_id'});
    // const doctors = await Doctor.find({},{createdAt:0,updatedAt:0,__v:0}).populate('user',['name','email']);
    // const doctors = await Doctor.find({},{createdAt:0,updatedAt:0,__v:0}).explain('queryPlanner');
    const doctors = userId ? await Doctor.find({ user: userId }).populate({ path: 'user', select: 'name' }) :
        await Doctor.find({}).populate({ path: 'user', select: 'name' });
    res.status(200).json(doctors);
});

//private by admin -> api/admin/approved-doctors
export const get_all_approved_doctors = asyncHandler(async (req, res) => {
    try {
        // const doctors = await Doctor.find({});
        const doctors = await Doctor.find({ status: 'approved', user: { $ne: req.user._id } }).populate('user');
        res.status(200).json(doctors);

    } catch (error) {
        console.log(error)
        res.json(error)
    }
});

//@todo private by admin -> api/admin/approve-all-as-doctor

//private by admin -> api/admin/approve-as-doctor/:id
export const approveAsDoctor = asyncHandler(async (req, res) => {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, { status: 'approved' });

    //send approval notification to the doctor
    const user = await UserDetails.findById(doctor.user);
    const unseenNotifications = user.unseenNotifications;

    unseenNotifications.push({
        type: 'doctor-approval',
        message: `Your application for doctor is approved!`,
    });
    user.isDoctor = true;

    await user.save();
    res.status(200).json({ success: true });
});

//private by admin -> api/admin/remove-as-doctor/:id
export const removeAsDoctor = asyncHandler(async (req, res) => {
    const doctor = await Doctor.findByIdAndRemove(req.params.id);

    //@todo send approval notification to the user

    const user = await UserDetails.findById(doctor.user);
    user.isDoctor = false;
    // const unseenNotifications = user.unseenNotifications;

    // unseenNotifications.push({
    //     type: 'doctor-approval',
    //     message: `Your application for doctor is approved!`,
    // });
    // user.isDoctor = true;

    await user.save();
    res.status(200).json({ success: true });
});