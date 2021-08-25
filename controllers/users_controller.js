module.exports.profile = function (req, res) {
  res.end("<h1>User Profile</h1>");
};

module.exports.email = function (req, res) {
  res.end("<h1>this is email of the user</h1>");
};

module.exports.signup = function (req, res) {
  res.end("<h1>sigin page</h1>");
};
module.exports.signin = function (req, res) {
  res.render("user_sign_in", { id: "adarsh", password: "pandey" });
};
module.exports.signup = function (req, res) {
  res.render("user_sign_up", { id: "adarsh", password: "pandey" });
};
