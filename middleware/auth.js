import asyncHandler from "express-async-handler";
import jwt from 'jsonwebtoken';
import { UserDetails } from "../models/UserDetails.js";

export const protect = asyncHandler(async(req,res,next)=>{
    let token;
    token = req.cookies.jwt;

    if(token){
        try {
            const decoded_token = jwt.verify(token,process.env.JWT_SECRET);
            req.user = await UserDetails.findById(decoded_token.id).select('-password');
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
});

export const protectByAdmin = asyncHandler(async(req,res,next)=>{
    if(req.user && req.user.role === 'admin'){
        next();
    }
    else{
        res.status(401);
        throw new Error('Not authorized as Admin !');
    }
});

export const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}