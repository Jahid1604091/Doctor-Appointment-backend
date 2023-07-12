import asyncHandler from "express-async-handler";

//private -> api/notifications/:id
export const send_notification = asyncHandler(async (req, res) => {
    const data = { 'test': "Test" }
    // await io.sockets.in(req.params.id).emit(`message`, data)
    res.json({ msg: "Data sent!" });
    //notify user (data)

});