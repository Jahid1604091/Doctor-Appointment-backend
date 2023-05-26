import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user.js';
import doctorRoutes from './routes/doctor.js';
import adminRoutes from './routes/admin/users.js';
import { errHandler, notFound } from './middleware/errorHandler.js';
import { connectDB } from './config/db.js';
import cookieParser from 'cookie-parser';
dotenv.config();
const PORT = process.env.PORT || 5000;
connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use('/api/users',userRoutes);
app.use('/api/doctors',doctorRoutes);
app.use('/api/admin',adminRoutes);

app.get('/',(req,res)=>res.send('Server Running'));

app.use(notFound);
app.use(errHandler);

app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));