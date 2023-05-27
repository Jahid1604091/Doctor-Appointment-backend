import mongoose, { Schema } from 'mongoose';

const appointmentSchema = mongoose.Schema({

    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
    },
    doctor:{
        type:Schema.Types.ObjectId,
        ref:'Doctor',
    },
    time:{
        type:String,
        required:true,
    },
    date:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        default:'pending'
    },

}, { timestamps: true });


export const Appointment = mongoose.model('Appointment', appointmentSchema);

