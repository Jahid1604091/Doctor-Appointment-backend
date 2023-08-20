import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { UserDetails } from "../models/UserDetails.js";
import passport from "passport";

export default function () {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
        passReqToCallback:true
      },
      async (req,accessToken, refreshToken, profile, done) => {
        //save data
       
        try {
          const user = await UserDetails.findOne({ googleId: profile.id });
          if (user) {
            done(null, user);
            
          } else {
            const user = await UserDetails.create({
              googleId: profile.id,
              email: profile.emails[0].value,
              name: profile.displayName,
              avatar: profile.photos[0].value,
              // password:null
            });
          
              done(null, user);
              // return res.status(201).json({
              //   success: true,
              //   data: user,
              //   token: user.getSignedJwtToken(),
              // });
          }
        } catch (error) {
        //   const errors = Object.values(error.errors);
        //   res.status(400).json({ msg: errors[0].message });
        console.log(error)
        }
      }
    )
  );

  passport.serializeUser(function(user, done) {
    done(null, user);
    });
    
    passport.deserializeUser(function(user, done) {
    done(null, user);
    });


}
