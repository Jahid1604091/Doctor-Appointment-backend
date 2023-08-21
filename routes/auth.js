import express from "express";
import passport from "passport";

const router = express.Router();

router.get("/login/success", (req, res) => {
  console.log('Login Success')
  if (req.user) {
      res.cookie("jwt", req.user.getSignedJwtToken(), {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 30 * 24 * 24 * 60 * 60,
    });
    res.json({
      success: true,
      message: "user has successfully authenticated",
      user: req.user,
      cookies: req.cookies
    });
  }
});

router.get("/login/failed", (req, res) => {
  console.log('Login Fail ')
  res.status(401).json({
    success: false,
    message: "user failed to authenticate."
  });
});


router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/logout", (req, res) => {
  console.log('Logout ')
  req.logout();
  res.redirect(process.env.NODE_ENV==='production' ? process.env.LIVE_DOMAIN : process.env.DEV_DOMAIN);
});

router.get("/google/callback",passport.authenticate("google"),(req,res)=>{
  console.log('Callback ')

  res.redirect(process.env.NODE_ENV==='production' ? process.env.LIVE_DOMAIN : process.env.DEV_DOMAIN)
});

// router.get("/google/callback",passport.authenticate("google", {
//     successRedirect: process.env.DEV_DOMAIN,
//     failureRedirect: "/auth/login/failed",
//   })
// );

export default router;
