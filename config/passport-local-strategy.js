const passport = require("passport");
//we also need rthe local strategy that we installed
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");
//we need to tell passport to use this local strategy that we have created

//authonticaion use passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    function (email, password, done) {
      //find the user and establish the identity
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          console.log("Error in finding the user ---> Passport");
          return done(err);
        }
        if (!user || user.password != password) {
          console.log("invali user name and password");
          return done(null, false);
        }
        return done(null, user);
      });
    }
  )
);

//serialising the user to deside which key is to be kept in the cookie

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

//deserilising the user from the key in the cookie

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      console.log("error in finding the user ---> passport");
      return done(err);
    }
    return done(null, user);
  });
});

//check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
  //if the user is signined the pass on the request to the next function(controllers action)
  if (req.isAuthenticated()) {
    return next();
  }
  //if the user is not signed in
  return res.redirect("/users/sign-in");
};



passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    //req.user contains the current signed in users from the sessions cookie and we are just sending this to the locals for the views
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
