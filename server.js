import express from 'express';
import dotenv from 'dotenv';
import path from 'path'
import userRoutes from './routes/user.js';
import doctorRoutes from './routes/doctor.js';
import adminRoutes from './routes/admin/users.js';
import uploadRoutes from './routes/upload.js';
import sslRoutes from './routes/ssl.js';
import authRoutes from './routes/auth.js';
import { errHandler, notFound } from './middleware/errorHandler.js';
import { connectDB } from './config/db.js';
import passportConfig from './config/passport.js';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import { authCheck } from './middleware/auth.js';

const __dirname = path.resolve() //__dirname is not directly available in es module
dotenv.config();

// console.log(envRes.parsed)
const PORT = process.env.PORT || 5000;
connectDB();

//passport
passportConfig(passport);


const app = express();
// app.set('trust proxy', 1);
// app.use(express.static('dist'))

app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: [process.env.DEV_DOMAIN,process.env.LIVE_DOMAIN],
    // origin: "*",
    methods: ['GET','POST','PUT','PATCH','DELETE'],
    allowedHeaders: ['Content-Type',],
  }));

app.use(session({
  secret: 'keyboarddfcat',
  resave: false,
  saveUninitialized: false,
  // cookie: { secure: true }
}));




app.use(passport.initialize());
app.use(passport.session())

app.get("/", authCheck, (req, res) => {
  res.status(200).json({
    authenticated: true,
    message: "user successfully authenticated",
    user: req.user,
    cookies: req.cookies
  });
});


app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));


app.get('/',(req,res)=>res.send('Server Running...'));

app.use('/api/users',userRoutes);
app.use('/api/doctors',doctorRoutes);
app.use('/api/admin',adminRoutes);
app.use('/api/upload',uploadRoutes);
app.use('/api/payment',sslRoutes);
app.use('/auth',authRoutes)
//make a folder static
// app.use('/uploads',express.static(path.join(__dirname,'/uploads')))



app.use(notFound);
app.use(errHandler);

app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));