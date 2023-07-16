import asyncHandler from "express-async-handler";
import express from 'express';
import { sendNotification } from "../controllers/notifications.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post('/:id', protect, sendNotification);
// function socketRouter(io) {
//     const router = express.Router();
//     io.sockets.on('connection', (client) => {

//         router.post('/:id', async (req, res) => {

//             const data = req.body;
//             io.sockets.emit(`message`, data)
//             // io.sockets.in(req.params.id).emit(`message`, data)
//             res.json({ msg: "Data sent!" });

//         });
//     });


//     return router;
// }

export default router;