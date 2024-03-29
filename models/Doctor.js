import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'UserDetails'
    },
}, {
    timestamps: true
});

const doctorSchema = mongoose.Schema({

    user:{
        type:mongoose.Types.ObjectId,
        ref:'UserDetails'
    },
    email:{
        type:String,
        required:true,
        
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
    },
    verification_ss:{
        type:String
    },
    reviews: [reviewSchema],
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0
    },
}, { timestamps: true });

doctorSchema.pre('remove',async function(next){
    this.model('Appointment').deleteMany({doctor:this._id});
    next();
})

export const Doctor = mongoose.model('Doctor', doctorSchema);