import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const userSchema = mongoose.Schema({

    name: {
        type: String,
        minlength: [5, 'Name cant be less than 5 char']
    },

    email: {
        type: String,
        unique: true,
        required: [true, 'Please add a valid email'],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    isDoctor: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
    },
    seenNotifications: {
        type: Array,
        default: []
    },
    unseenNotifications: {
        type: Array,
        default: []
    },
    avatar: {
        url: String,
        secure_url: String,
        public_id: String,
    },
    address: {
        city: String,
        state: String,
        zip: String,
    },
    isComplete: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    emailVerificationToken: String,
    emailTokenExpire: Date,
    verified: Boolean,



},
    {
        //reverse populate
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    },
    { timestamps: true })


//encrypt pass
userSchema.pre('save', async function (next) {

    //only run when changed
    if (!this.isModified('password')) {
        next();
    }
    //else encrypt

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

})

//compare password
userSchema.methods.matchPassword = async function (enteredPass) {
    return await bcrypt.compare(enteredPass, this.password)
}

//sign JWT
userSchema.methods.getSignedJwtToken = function () {
    //returning token
    return jwt.sign({ id: this._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRED_IN });


}

userSchema.methods.getResetPasswordToken = function () {

    //generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    //Hashing token
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    //expire
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    return resetToken;
}

//reverse populate with virtuals
userSchema.virtual('doctor',{
    ref:'Doctor',
    localField:'_id',
    foreignField:'user',
    
});
userSchema.virtual('appointments',{
    ref:'Appointment',
    localField:'_id',
    foreignField:'user',
    
});

export const UserDetails = mongoose.model('UserDetails', userSchema);
