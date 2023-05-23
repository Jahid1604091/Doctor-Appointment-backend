import asyncHandler from "express-async-handler";
import { User } from "../models/user.js";
import jwt from 'jsonwebtoken';

export const protect = asyncHandler(async(req,res,next)=>{
    let token;
    token = req.cookies.jwt;

    if(token){
        try {
            const decoded_token = jwt.verify(token,process.env.JWT_SECRET);
            req.user = await User.findById(decoded_token.id).select('-password');
            next();
        } catch (error) {
            res.status(401);
            throw new Error(`Unauthorized, Invalid Token`);

        }
    }
    else{
        res.status(401);
        throw new Error(`Unauthorized, token not found`);
    }
})