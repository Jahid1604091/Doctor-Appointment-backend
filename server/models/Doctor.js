import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const doctorSchema = mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    expertise_in: {
        type: String,
        required: [true, 'Please add your expertise area'],
    },
    experience: {
        type: Number,
        required: [true, 'Please add your experience(year) in number'],
    },
    fee: {
        type: Number,
        required: [true, 'Please add your consulting fee'],
    },

    phone: {
        type: String,
        required: true
    },
    status:{
        type:String,
        default:'pending'
    },
    timings:{
        type:Array,
        required:true
    }
}, { timestamps: true });


export const Doctor = mongoose.model('Doctor', doctorSchema);