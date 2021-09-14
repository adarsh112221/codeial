const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");

//tell passport to use a new strategy to google login
passport.use(
  //use these details provided by the google
  new googleStrategy(
    {
      clientID:
        "813904193880-cb8se9t7a3nsjkk3g0canijqt2b1nsrt.apps.googleusercontent.com",
      clientSecret: "vEzH-632MOKI1jJX8kk4rXwa",
      callbackURL: "http://localhost:8000/users/auth/google/callback",
    },
    function (accessToken, refershToken, profile, done) {
      User.findOne({ email: profile.emails[0].value }).exec(function (
        err,
        user
      ) {
        if (err) {
          console.log("error in google strategy-passport", err);
          return;
        }
        console.log(profile);
        if (user) {
          //find a user if found set this user as req.user
          return done(null, user);
        } else {
          //if not create this user
          User.create(
            {
              name: profile.displayName,
              email: profile.emails[0].value,
              passport: crypto.randomBytes[20].toString("hex"),
            },
            function (err, user) {
              if (err) {
                console.log("error in finding the user");
                return;
              } 
                return done(null, user);
              
            }
          );
        }
      });
    }
  )
);

module.exports = passport;
