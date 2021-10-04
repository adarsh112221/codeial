const Post = require("../models/post");
const User = require("../models/user");
const Friends = require("../models/friendship");
module.exports.home = async function (req, res) {
  //Post.find({},function(err,posts)
  //{
  // return res.render('home',{
  //   title:" Home",
  //   posts:posts
  // })

  //})

  //populate the user of each
  try {
    let posts = await Post.find({})
      .populate("user")
      .sort("-createdAt")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      });
    let friends = await Friends.find({ from_user: req.user.id }).populate(
      "to_user",
      "name email"
    );
    let users = await User.find({});
    return res.render("home", {
      title: " Home",
      posts: posts,
      all_users: users,
      friends: friends,
    });
  } catch (err) {
    console.log("Error", err);
  }
};

//module.exports.actionName=function(req,res){}
module.exports.notifications = function (req, res) {
  return res.end("<h1>notifications are here</h1>");
};
