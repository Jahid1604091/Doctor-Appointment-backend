import mongoose from "mongoose";

const doctorSchema = mongoose.Schema({
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
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
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
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
    },
    phone: {
        type: Number,
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