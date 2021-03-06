const User = require("../../../models/user");
const jwt = require("jsonwebtoken");
const env=require("../../../config/enviornment")
module.exports.createSession = async function (req, res) {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user || user.password != req.body.password) {
      return res.json(422, {
        message: "invalid username or password",
      });
    }
    return res.json(200, {
      message: "Sign in successfull here is your token keep it safe ",
      data: {
        token: jwt.sign(user.toJSON(), env.jwt_secret, { expiresIn: "100000" }),
      },
    });
  } catch (err) {
    return res.json(500, { message: "internal server error" });
  }
};
