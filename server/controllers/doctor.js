import asyncHandler from "express-async-handler";
import { Doctor } from "../models/Doctor.js";
import { Appointment } from "../models/Appointment.js";
import moment from "moment";
import ErrorResponse from "../utils/errorResponse.js";
import sendEmail from "../utils/sendMail.js";
import { UserDetails } from "../models/UserDetails.js";
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from "path";


//private -> api/doctors/:id/
export const get_doctor_by_id = asyncHandler(async (req, res) => {
    const doctor = await Doctor.findById(req.params.id).populate('user');
    res.status(200).json(doctor);
});

//In profile you can get the doctors details by userId
export const get_doctor_by_userId = asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const doctor = await Doctor.find({ user: userId });
    res.status(200).json(doctor);
});

//private -> api/doctors/check-availability
export const checkAvailability = asyncHandler(async (req, res) => {

    const { user, doctor, date, time } = req.body;

    // const {  } = req.query;


    const from_time = moment(time).subtract(10, 'minutes').toISOString();
    const to_time = moment(time).add(10, 'minutes').toISOString();


    const appointments = await Appointment.find({
        //doctor and user id

        doctor,
        date: moment(date).format('DD-MM-YYYY'),
        time: { $gte: from_time, $lt: to_time }


    });

    //saved in DB as 6 hrs ahead than us
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

//private -> api/doctors/appointments/:appointment_id
export const approve_appointment = asyncHandler(async (req, res, next) => {
    //meetAt = any offline address or Zoom Link
    const { placeType, place } = req.body;
    const appointment = await Appointment.findById(req.params.appointment_id).populate('user', 'email name');
    const loggedUser = await UserDetails.findById(req.user._id);

    if (!appointment) {
        next(new ErrorResponse("Appointment Not Found", 404));
    }

    //if isPaid then approve and sent mail to patient
    if (appointment.isPaid) {
        //change in db
        appointment.status = 'approved';
        appointment.meetBy = placeType;
        appointment.meetAt = place;
        appointment.approvedAt = Date.now();

        //send mail
        const message = `Dear ${appointment.user.name}\n,
        \nYour appointment is scheduled at: <strong>${appointment.meetAt}</strong>\n\n
        On   ${moment(appointment.time).format("hh:mm a")}, ${appointment.date}. \nThanks for Your Appointment!\nRegards\n,
        <h5>${loggedUser.name}</h5>`;

        await sendEmail({
            email: appointment.user.email,
            subject: 'Appointment Notice',
            message
        });

        const updatedAppointment = await appointment.save();
        res.status(200).json({ msg: `Email Sent to ${appointment.user.name}` })
    }
    else {
        next(new ErrorResponse(`${appointment.user.name}has not paid yet`, 400));
    }

});


//private -> api/doctors/appointments/:appointment_id
export const make_prescription = asyncHandler(async (req, res) => {

    const {medicineList} = req.body;
    const appointed_patient = await Appointment.findById(req.params.appointment_id)
        .populate('user', 'email');
    const doctor = await UserDetails.findById(req.user._id);

   
    const targetPath = './server/pdf/';
    const fileName = 'test.pdf';

    const doc =  new PDFDocument();
    doc.pipe(fs.createWriteStream(targetPath+fileName));

    doc.text(doctor.name,100,100);
    doc.moveDown(5);
    doc.text(`Date : ${ moment().format('DD-MM-YYYY')}`, {
        width: 410,
        align: 'right'
      }
      );
    doc.list(medicineList);

    doc.end();

    const message = `Your Medicine List \n :`;
    //   const __dirname = path.dirname
    try {
        await sendEmail({
            email: appointed_patient.user.email,
            subject: 'Prescription',
            message,
            attachments:[{
                filename:fileName,
                path:targetPath+fileName,
                contentType:'application/pdf'
            }]
        });
        res.status(200).json({ success: true, data: {msg:'Email sent to '+appointed_patient.user.email} });
    } catch (err) {
        res.status(500).json({ msg: 'Email Could not be sent !' });
        console.log(err)
    }

});

