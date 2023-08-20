import express from "express";
import passport from "passport";


const router = express.Router();

// router.get("/",  (req, res) => {
//   //  const details = await UserDetails.findById(req.user)

//   if (req.user) {
//     // res.cookie("jwt", req.user.getSignedJwtToken(), {
//     //   httpOnly: true,
//     //   secure: true,
//     //   sameSite: "None",
//     //   maxAge: 30 * 24 * 24 * 60 * 60,
//     // });
//     return res.status(200).json({
//       success: true,
//       message: "successfull",
//       user: req.user,
//       // cookies: req.cookies
//     });
//   }
// });

// router.get("/login/failed", (req, res) => {
//   res.status(401).json({
//     success: false,
//     message: "failure",
//   });
// });

// router.get("/logout", (req, res) => {
//   console.log("Logout");
//   req.logout();
//   res.status(200).clearCookie('connect.sid', {
//     path: '/login',
//     secure: false,
//     httpOnly: false,
//     domain: process.env.DEV_DOMAIN+'/login',
//     sameSite: true,
//   });
//   req.session.destroy(function (err) {
//     res.redirect(process.env.DEV_DOMAIN + "/login");
//   });
// });

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// router.get("/google/callback",passport.authenticate("google"),(req,res)=>{
//   res.cookie("jwt", req.user.getSignedJwtToken(), {
//       httpOnly: true,
//       secure: true,
//       sameSite: "None",
//       maxAge: 30 * 24 * 24 * 60 * 60,
//     });
//   res.redirect(process.env.DEV_DOMAIN)
// });

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.DEV_DOMAIN,
    failureRedirect: "/login",
  })
);

export default router;
