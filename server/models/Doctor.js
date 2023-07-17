import mongoose from 'mongoose';

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
    certificate_url:{
        type:String
    }
}, { timestamps: true });

doctorSchema.pre('remove',async function(next){
    this.model('Appointment').deleteMany({doctor:this._id});
    next();
})

export const Doctor = mongoose.model('Doctor', doctorSchema);