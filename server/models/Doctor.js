import mongoose from 'mongoose';

const doctorSchema = mongoose.Schema({
    // userId:{
    //     type:String,
    //     required:true
    // },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    email:{
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
        default:'pending',
        index:true
    },
    timings:{
        type:Array,
        required:true
    }
}, { timestamps: true });


export const Doctor = mongoose.model('Doctor', doctorSchema);