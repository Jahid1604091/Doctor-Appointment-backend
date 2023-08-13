import express from 'express';
import dotenv from 'dotenv';
import path from 'path'
import userRoutes from './routes/user.js';
import doctorRoutes from './routes/doctor.js';
import adminRoutes from './routes/admin/users.js';
import uploadRoutes from './routes/upload.js';
import sslRoutes from './routes/ssl.js';
import { errHandler, notFound } from './middleware/errorHandler.js';
import { connectDB } from './config/db.js';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';

const __dirname = path.resolve() //__dirname is not directly available in es module
dotenv.config();

// console.log(envRes.parsed)
const PORT = process.env.PORT || 5000;
connectDB();
const app = express();

app.use(express.static('dist'))
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.get('/',(req,res)=>res.send('Server Running...'));

app.use('/api/users',userRoutes);
app.use('/api/doctors',doctorRoutes);
app.use('/api/admin',adminRoutes);
app.use('/api/upload',uploadRoutes);
app.use('/api/payment',sslRoutes);

//make a folder static
// app.use('/uploads',express.static(path.join(__dirname,'/uploads')))



app.use(notFound);
app.use(errHandler);

app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));