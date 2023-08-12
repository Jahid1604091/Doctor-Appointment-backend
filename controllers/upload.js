import asyncHandler from "express-async-handler";
import cloudinary, { uploadAvatar, uploadCertificate } from "../config/cloudinary.js";

export const upload_avatar = asyncHandler(async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        res.status(200).json(result)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
})


export const upload_file = asyncHandler(async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        res.status(200).json(result)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
})

export const deleteFile = asyncHandler(async(req,res)=>{
    try {
        const result = await cloudinary.uploader.destroy(req.params.id);
        res.json(result);

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
});