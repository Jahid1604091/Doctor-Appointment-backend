import asyncHandler from "express-async-handler";
import { User } from "../models/user.js";
import { Doctor } from "../models/doctor.js";
import { Appointment } from "../models/Appointment.js";
import moment from "moment-timezone";
//public -> api/users/auth
export const auth_user = asyncHandler(async (req, res) => {

    const { email, password } = req.body;
    const user = await User.findOne({ email });


    if (user && (await user.matchPassword(password))) {
        //set cookie
        res.cookie('jwt', user.getSignedJwtToken(), {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 30 * 24 * 24 * 60 * 60
        })
        return res.status(200).json({
            success: true,
            data: user,
            token: user.getSignedJwtToken()
        });

    }
    else {
        res.status(400);
        throw new Error('Invalid Email or Password');
    }
});

//private -> api/users/logout
export const logout = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({ message: "User Logged Out!" });
});

//public -> api/users
export const register = asyncHandler(async (req, res) => {
    const isExist = await User.findOne({ email: req.body.email });
    if (isExist) {
        res.status(400);
        throw new Error('User Already Exist')
    }
    const user = await User.create(req.body);
    if (user) {
        res.cookie('jwt', user.getSignedJwtToken(), {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 30 * 24 * 24 * 60 * 60
        })
        return res.status(201).json({
            success: true,
            data: user,
            token: user.getSignedJwtToken()
        });

    }
    else {
        res.status(400);
        throw new Error('Invalid Data');
    }
});

//private -> api/users/profile/
export const get_profile = asyncHandler(async (req, res) => {

    res.status(200).json(req.user)
});

//private -> api/users/profile/
export const update_profile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user);
    if (!user) {
        throw new Error('User not found', 404);
    }
    if (!req.body.password) {
        throw new Error('Please provide your password ', 404);
    }
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.password = req.body.password
    const updatedUser = await user.save();
    return res.status(200).json({
        success: true,
        data: updatedUser
    });
});

//private -> api/users/profile/
export const delete_profile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user);

    if (!user) {
        throw new Error('User not found', 404);

    }
    else {

        const deletedUser = await User.findByIdAndRemove(req.user);
        return res.status(200).json({
            success: true,
            data: deletedUser.name + ' is removed!'
        });
    }




});


//private -> api/users/apply-as-doctor
export const register_as_doctor = asyncHandler(async (req, res) => {

    const isExist = await Doctor.findOne({ userId: req.user._id });
    if (isExist) {
        res.status(400);
        throw new Error('This Doctor Account Already Exist');
    }

    const newDoctor = new Doctor({ ...req.body, status: "pending", user: req.user._id });
    await newDoctor.save();

    if (newDoctor) {
        //find user details
        const user = await User.findById(req.user._id);

        //send apply notification to admin
        const admin = await User.findOne({ role: 'admin' });
        const unseenNotifications = admin.unseenNotifications;

        unseenNotifications.push({
            type: 'new-doctor',
            message: `${user.name} has applied for doctor account!`,
            data: {
                doctorId: newDoctor._id,
                name: user.name
            },
            clickPath: '/admin/doctors'
        });

        await User.findByIdAndUpdate(admin._id, { unseenNotifications });


        return res.status(201).json({
            success: true,
            data: newDoctor,
        });

    }
    else {
        res.status(400);
        throw new Error('Invalid Data');
    }
});

//private -> api/users/mark-all-as-read
export const markAllAsRead = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user);
    const unseenNotifications = user.unseenNotifications;
    const seenNotifications = user.seenNotifications;
    seenNotifications.push(...unseenNotifications);
    user.unseenNotifications = [];
    await user.save();

    res.status(200).json({
        success: true,
        data: user
    })

});

//private -> api/users/apply-as-doctor
export const new_appointment = asyncHandler(async (req, res) => {

    // const isExist = await Appointment.findOne({userId:req.user._id});
    // if (isExist) {
    //     res.status(400);
    //     throw new Error('This Appointment Already Exist');
    // }
    const { time, date } = req.body;
    const doctor = await Doctor.findById(req.body.doctor);
    const doctor_user_table = await User.findById(doctor.user);
    // const Asia_time = new Date(req.body.time.getTime() - (req.body.time.offset * 60000));

    delete req.body.date;

    const newAppointment = new Appointment({
        ...req.body,
        date:moment(date).format('YYYY-MM-DD'),
        status: "pending"
    });


    await newAppointment.save();

    // if (newAppointment) {

    //     //User who applying for appointment (patient)
    //     const user = await User.findById(req.body.user);

    //     //send appointment notification to doctor
    //     const unseenNotifications = doctor_user_table.unseenNotifications;

    //     unseenNotifications.push({
    //         type: 'new-appointment',
    //         message: `${user.name} has applied for your appointment!`,
    //         clickPath: '/doctors/appointments'
    //     });

    //     await doctor_user_table.save();

    //     return res.status(201).json({
    //         success: true,
    //         data:doctor_user_table
    //     });

    // }
    // else {
    //     res.status(400);
    //     throw new Error('Invalid Data');
    // }
});




