
import mongoose, { Schema } from 'mongoose';

const appointmentSchema = mongoose.Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'UserDetails',
    },
    doctor: {
        type: Schema.Types.ObjectId,
        ref: 'Doctor',
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        default: 'pending'
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false
    },
    meetBy: {
        type: String,
        enum: ['online', 'offline'],
        default: 'online'
    },
    meetAt:{
        type:String,
        required:[true,'Please add Location or meeting Link']
    },
    paidAt: {
        type: Date,

    },
    approvedAt: {
        type: Date,
    },

}, { timestamps: true });


export const Appointment = mongoose.model('Appointment', appointmentSchema);

