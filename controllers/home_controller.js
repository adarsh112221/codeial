const Post = require("../models/post");
const User = require("../models/user");
module.exports.home = function (req, res) {
  //Post.find({},function(err,posts)
  //{
  // return res.render('home',{
  //   title:" Home",
  //   posts:posts
  // })

  //})

  //populate the user of each
  Post.find({})
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    })
    .exec(function (err, posts) {
      User.find({}, function (err, users) {
        return res.render("home", {
          title: " Home",
          posts: posts,
          all_users: users,
        });
      });
    });
};

//module.exports.actionName=function(req,res){}
module.exports.notifications = function (req, res) {
  return res.end("<h1>notifications are here</h1>");
};
