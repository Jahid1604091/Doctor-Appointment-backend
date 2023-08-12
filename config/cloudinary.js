import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

export default cloudinary;

function checkFileType(file, cb) {

    const filetypes = /jpg|jpeg|png|pdf/;

    const extname = filetypes.test(
        path.extname(file.originalname).toLocaleLowerCase()
    );

    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(null, false);
    }
}

const storageAvatar = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "avatar",
        transformation: { gravity: "center", height: 300, width: 300, crop: "fill" },
        public_id: (req, file) =>
            `${file.originalname.split(".")[0]}-${Date.now()}`,
        allowedFormats: ["jpg", "png", "jpeg"],
    }
});

export const uploadAvatar = multer({
    storage: storageAvatar,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
});

const storageCertificate = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "certificate",
        transformation: { gravity: "center", height: 300, width: 300, crop: "fill" },
        public_id: (req, file) =>
            `${file.originalname.split(".")[0]}-${Date.now()}`,
        allowedFormats: ["pdf"],
    }
});

export const uploadCertificate = multer({
    storage: storageCertificate,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
});