import asyncHandler from "express-async-handler";
import { Doctor } from "../models/Doctor.js";
import { Appointment } from "../models/Appointment.js";
import { UserDetails } from "../models/UserDetails.js";
import moment from "moment";


//public -> api/users/auth
export const auth_user = asyncHandler(async (req, res) => {

    const { email, password } = req.body;
    const user = await UserDetails.findOne({ email });


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

    try {
        const isExist = await UserDetails.findOne({ email: req.body.email });
        if (isExist) {
            res.status(400);
            throw new Error('User Already Exist')
        }
        const user = await UserDetails.create(req.body);

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
    } catch (error) {
        const errors = Object.values(error.errors)
        res.status(400).json({ msg: errors[0].message })
    }

});

//private -> api/users/profile/
export const get_profile = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
});

//private -> api/users/profile/
export const update_profile = asyncHandler(async (req, res) => {
    const { city, state, zip, url, secure_url, public_id } = req.body;

    const user = await UserDetails.findById(req.user);
    if (!user) {
        throw new Error('User not found', 404);
    }

    user.name = req.body.name || user.name
    user.email = req.body.email || user.email

    user.avatar.url = url || user.avatar.url
    user.avatar.secure_url = secure_url || user.avatar.secure_url
    user.avatar.public_id = public_id || user.avatar.public_id
    user.address.city = city || user.address.city
    user.address.state = state || user.address.state
    user.address.zip = zip || user.address.zip

    if (user.address && user.avatar) {
        user.isComplete = true
    }

    const updatedUser = await user.save();

    return res.status(200).json({
        success: true,
        data: updatedUser
    });

});

//private -> api/users/profile/
export const delete_profile = asyncHandler(async (req, res) => {

    const user = await UserDetails.findById(req.user);

    if (!user) {
        throw new Error('User not found', 404);

    }
    else {

        const deletedUser = await UserDetails.findByIdAndRemove(req.user);
        return res.status(200).json({
            success: true,
            data: deletedUser.name + ' is removed!'
        });
    }




});

//private -> api/users/apply-as-doctor
export const register_as_doctor = asyncHandler(async (req, res) => {

    try {
        const isExist = await Doctor.findOne({ userId: req.user._id });
        if (isExist) {
            res.status(400);
            throw new Error('This Doctor Account Already Exist');
        }
    
        const newDoctor = new Doctor({ ...req.body, status: "pending", user: req.user._id });
        await newDoctor.save();
    
        if (newDoctor) {
            //find user details
            const user = await UserDetails.findById(req.user._id);
    
            //send apply notification to admin
            const admin = await UserDetails.findOne({ role: 'admin' });
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
    
            await UserDetails.findByIdAndUpdate(admin._id, { unseenNotifications });
    
    
            return res.status(201).json({
                success: true,
                data: newDoctor,
            });
    
        }
        else {
            res.status(400);
            throw new Error('Invalid Data');
        }
    } catch (error) {
        const errors = Object.values(error.errors)
        res.status(400).json({ msg: errors[0].message })
    }
  
});

//private -> api/users/mark-all-as-read
export const markAllAsRead = asyncHandler(async (req, res) => {
    const user = await UserDetails.findById(req.user);
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
    const doctor_user_table = await UserDetails.findById(doctor.user);
    // const Asia_time = new Date(req.body.time.getTime() - (req.body.time.offset * 60000));

    delete req.body.date;

    const newAppointment = new Appointment({
        ...req.body,
        date: moment(date).format('DD-MM-YYYY'),
        time: moment(time).toISOString(),
        status: "pending"
    });


    await newAppointment.save();

    if (newAppointment) {

        //User who applying for appointment (patient)
        const user = await UserDetails.findById(req.body.user);

        //send appointment notification to doctor
        const unseenNotifications = doctor_user_table.unseenNotifications;

        unseenNotifications.push({
            type: 'new-appointment',
            message: `${user.name} has applied for your appointment!`,
            clickPath: '/doctors/appointments'
        });

        await doctor_user_table.save();

        return res.status(201).json({
            success: true,
            data: doctor_user_table
        });

    }
    else {
        res.status(400);
        throw new Error('Invalid Data');
    }
});

//private -> api/users/booked-appointments
export const booked_appointments = asyncHandler(async (req, res) => {
    //get appointments list as user
    const appointments = await Appointment.find({ user: req.user._id }).populate('doctor');
    const user = await UserDetails.findById(req.user._id)
    //as doctor
    //get userId from logInfo -> compare it with doctor table -> from doctor Id compare with appointment table 
    //-> finally get appointments
    if (user?.isDoctor) {
        const doctor_id = await Doctor.findOne({ user: req.user._id });

        const appointments_as_doctor = await Appointment.aggregate([
            {
                $lookup: {

                    from: 'userdetails',
                    localField: 'user',
                    foreignField: '_id',
                    as: 'userInfo'
                }
            },
            { $unwind: "$userInfo" },
            {
                $match: {
                    $and: [{ "doctor": doctor_id._id }]
                }
            },
            {
                $project: {
                    _id: 1,
                    date: 1,
                    time: 1,
                    status: 1,
                    patientName: "$userInfo.name",

                }
            }
        ]);

        res.status(200).json({
            doctor: appointments_as_doctor,
            user: appointments,
        })

    }
    else {
        res.status(200).json(
            appointments,
        )
    }
});

//private -> api/users/appointments/:id
//method DELETE
export const delete_appointment = asyncHandler(async (req, res) => {

    const appointments = await Appointment.findById(req.params.id);

    if (!appointments) {
        throw new Error('Appointment not found', 404);
    }
    else {

        const deletedAppointment = await Appointment.findByIdAndRemove(req.params.id);
        return res.status(200).json({
            success: true,
            data: 'Appointment is removed!'
        });
    }




});






