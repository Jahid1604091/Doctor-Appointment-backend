
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
        default: false
    },

    meetBy: {
        type: String,
        enum: ['online', 'offline'],
        default: 'online'
    },
    meetAt: {
        type: String,
    },
    paidAt: {
        type: Date,
    },
    paymentMethod: {
        type: String
    },
    approvedAt: {
        type: Date,
    },

}, { timestamps: true });


export const Appointment = mongoose.model('Appointment', appointmentSchema);

