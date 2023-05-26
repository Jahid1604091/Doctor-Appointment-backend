import mongoose from 'mongoose';

const appointmentSchema = mongoose.Schema({
    name: {
        type: String,
        minlength: [5, 'Name cant be less than 5 char']
    },

}, { timestamps: true })


export const Appointment = mongoose.model('Appointment', appointmentSchema);

