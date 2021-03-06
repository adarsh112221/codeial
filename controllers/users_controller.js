const User = require("../models/user");
const crypto = require("crypto");
const ForgetPassword = require("../models/forgetpassword");
const Friendship = require("../models/friendship");
const queue = require("../config/kue");
const forgotPasswordMailer = require("../mailers/forgotpasswordmailer");
const forgotpasswordWorker = require("../workers/forgot_password_email_worker");
const fs = require("fs");
const path = require("path");
module.exports.profile = async function (req, res) {
  let user = await User.findById(req.params.id);
  let friends = await Friendship.find({ from_user: req.user.id }).populate(
    "to_user",
    "name email"
  );
  console.log(friends);
  res.render("user_profile", {
    title: "User Profile",
    profile_user: user,
    friends: friends,
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

module.exports.createnewpass = async function (req, res) {
  try {
    let user = await User.findOne({ email: req.body.email });
    let forpassword = await ForgetPassword.create({
      user: user._id,
      accessToken: crypto.randomBytes(20).toString("hex"),
      isValid: true,
    });
    forpassword = await ForgetPassword.findOne({
      user: user._id,
    }).populate("user", "name email");

    let job = queue.create("forgetemails", forpassword).save(function (err) {
      if (err) {
        console.log("Error in sending to the queue", err);
        return;
      }
      console.log("job enqueued", job.id); //as soon as the job is created the job id is sotred in it
    });

    if (req.xhr) {
      return res.status(200).json({
        data: {
          forpassword: forpassword,
        },
        message: "user found",
      });
    }
    if (user == null) {
      req.flash("error", "User not found");
      return res.redirect("back");
    } else {
      res.locals.forgottenuser = user.email;
      return res.render("create_new_password");
    }
  } catch (err) {
    console.log("error in finding the user!");
    req.flash("error", "User not found");
    return res.redirect("back");
  }
};
module.exports.setnewpasspage = async function (req, res) {
  try {
    let userdata = await ForgetPassword.findOne({
      accessToken: req.params.accessToken,
    });
    userdata = await ForgetPassword.findOne({ user: userdata.user }).populate(
      "user",
      "name email"
    );
    console.log(userdata);
    return res.render("create_new_password", { userdata: userdata });
  } catch (err) {
    console.log("there is no users data");
  }
};
module.exports.setnewpass = async function (req, res) {
  try {
    let checktoken = await ForgetPassword.findOne({
      accessToken: req.params.accessToken,
    });
    console.log(checktoken);
    if (
      req.body.password == req.body.confirmpassword &&
      checktoken.isvalid == true
    ) {
      await User.findOneAndUpdate(
        { email: req.body.email },
        { password: req.body.password }
      );

      await ForgetPassword.findOneAndUpdate(
        { accessToken: checktoken.accessToken },
        { isValid: false }
      );
      req.flash("success", "User password updated");
      return res.redirect("/users/sign-in");
    } else {
      req.flash("error", "failed to update password");
      return res.redirect("/");
    }
  } catch (err) {
    req.flash("error", "failed to update password");
    return res.redirect("/");
  }
};
module.exports.addfriends = async function (req, res) {
  try {
    let notfriends = true;
    let user = await User.findById(req.query.from_user).populate({
      path: "friendships",
      populate: {
        path: "to_user",
      },
    });
    console.log(user);
    let existingfriend = await Friendship.findOne({
      from_user: req.query.from_user,
      to_user: req.query.to_user,
    });
    if (existingfriend) {
      notfriends = false;
      user.friendships.pull(existingfriend._id);
      user.save();
      existingfriend.remove();
    } else {
      await Friendship.create({
        from_user: req.query.from_user,
        to_user: req.query.to_user,
      });
      let newfriend1 = await Friendship.findOne({
        from_user: req.query.from_user,
        to_user: req.query.to_user,
      }).populate("to_user", "name email");
      user.friendships.push(newfriend1);
      user.save();
    }
    return res.status(200).json({
      message: "Request sucessful!",
      data: {
        friendshipstatus: notfriends,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: "Request unsucessful!",
    });
  }
};
