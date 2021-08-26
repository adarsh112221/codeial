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
  //Todo
};
//sign-in and create the session
module.exports.createSession = function (req, res) {
  //Todo
};
