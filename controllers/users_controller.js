const User = require("../models/user");
module.exports.profile = function (req, res) {
  res.render("user_profile");
};

module.exports.email = function (req, res) {
  res.end("<h1>this is email of the user</h1>");
};
module.exports.signin = function (req, res) {
  res.render("user_sign_in", {
    title: "Codeial | Sign Up",
  });
};
module.exports.signup = function (req, res) {
  res.render("user_sign_up", {
    title: "Codeial | Sign Up",
  });
};

//get the signup data
module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("error in finding user in signing up");
      return;
    }
    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("error in signing up the user");
        }
        return res.redirect("/users/sign-in");
      });
    } else {
      return res.redirect("/users/sign-in");
    }
  });
};
//sign-in and create the session
module.exports.createSession = function (req, res) {
  //steps to auth

  //find the user
  User.findOne({
    email: req.body.email},
    function(err, user){
      if (err) {
        console.log("error in finding user in signing in");
        return;
      }
      //handle user found
      if (user) {
        // handle password which doesn't match
        if (user.password != req.body.password) {
          return res.redirect("back");
        }

        // handle session creation
        res.cookie("user_id", user.id);
        return res.redirect("/users/profile");
      } else {
        // handle user not found

        return res.redirect("back");
      }
    }
  );
}

