const User = require("../models/user");
const fs = require("fs");
const path = require("path");
module.exports.profile = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    res.render("user_profile", {
      title: "User Profile",
      profile_user: user,
    });
  });
};

module.exports.update = async function (req, res) {
  // if (req.user.id == req.params.id) {
  //   User.findByIdAndUpdate(
  //     req.params.id,
  //     { name: req.body.name, email: req.body.email },
  //     function (err, user) {
  //     req.flash("success", "UserProfile Updated successfully");
  //       return res.redirect("back");
  //     }
  //   ); //you can also use req.body directly
  // } else {
  //   req.flash("error", "Unauthorised");
  //   return res.status(401).send("Unauthorised");
  // }
  if (req.user.id == req.params.id) {
    try {
      let user = await User.findByIdAndUpdate(req.params.id);
      User.updloadedAvatar(req, res, function (err) {
        if (err) {
          console.log("******Multer Error", err);
        }
        user.name = req.body.name;
        user.email = req.body.email;
        if (req.file) {
          if (user.avatar) {
            fs.unlink(path.join(__dirname, "..", "user.avatar"));
          }

          //we are just saving the location in user,avatar feild to display it later
          user.avatar = User.avatarPath + "/" + req.file.filename;
        }
        user.save();
        return res.redirect("back");
      });
    } catch {
      return res.status(401).send("Unauthorised");
    }
  } else {
    req.flash("error", "Unauthorised");
    return res.status(401).send("Unauthorised");
  }
};
module.exports.email = function (req, res) {
  res.end("<h1>this is email of the user</h1>");
};
module.exports.signin = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  res.render("user_sign_in", {
    title: "Codeial | Sign Up",
  });
};
module.exports.signup = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
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
  req.flash("success", "Logged in successfully");
  return res.redirect("/");
};

module.exports.destroySession = function (req, res) {
  req.logout(); //this function is given by passport.js
  req.flash("success", "You Have Logged out successfully");

  return res.redirect("/");
};

//forget password
module.exports.Forgetpass = function (req, res) {
  return res.render("user_forget_password");
};
module.exports.newpass = function (req, res) {
  return res.render("create_new_password");
};
module.exports.createnewpass = function (req, res) {
  console.log(req.body.email);
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("error in finding the user!");
      req.flash("error", "User not found");
      return res.redirect("back");
    }
    if (user == null) {
      req.flash("error", "User not found");
      return res.redirect("back");
    } else {
      console.log(user);
      return res.redirect("/users/create-new-password");
    }
  });
};
