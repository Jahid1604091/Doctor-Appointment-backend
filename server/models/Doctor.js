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
//encrypt pass
doctorSchema.pre('save', async function (next) {

    //only run when changed
    if (!this.isModified('password')) {
        next();
    }
    //else encrypt

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

})

//compare password
doctorSchema.methods.matchPassword = async function (enteredPass) {
    return await bcrypt.compare(enteredPass, this.password)
}

//sign JWT
doctorSchema.methods.getSignedJwtToken = function () {
    //returning token
    return jwt.sign({ id: this._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRED_IN });


}


export const Doctor = mongoose.model('Doctor', doctorSchema);