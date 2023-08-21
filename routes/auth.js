import express from "express";
import passport from "passport";

const router = express.Router();

router.get("/login/success", (req, res) => {
 
  if (req.user) {
    res.json({
      success: true,
      message: "user has successfully authenticated",
      user: req.user,
      cookies: req.cookies
    });
  }
});

router.get("/login/failed", (req, res) => {
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
  req.logout();
  res.redirect(process.env.NODE_ENV==='production' ? process.env.LIVE_DOMAIN : process.env.DEV_DOMAIN);
});

router.get("/google/callback",passport.authenticate("google"),(req,res)=>{
  res.cookie("jwt", req.user.getSignedJwtToken(), {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 30 * 24 * 24 * 60 * 60,
    });
  res.redirect(process.env.NODE_ENV==='production' ? process.env.LIVE_DOMAIN : process.env.DEV_DOMAIN)
});

// router.get("/google/callback",passport.authenticate("google", {
//     successRedirect: process.env.DEV_DOMAIN,
//     failureRedirect: "/auth/login/failed",
//   })
// );

export default router;
