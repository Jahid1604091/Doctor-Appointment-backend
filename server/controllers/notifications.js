import asyncHandler from "express-async-handler";

export const sendNotification = asyncHandler(async (req, res) => {
    const io = req.app.get('socketio');
    const data = req.body;
    res.json({ msg: "Data Sent" })
});
