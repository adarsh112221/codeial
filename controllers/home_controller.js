const Post = require("../models/post");
module.exports.home = function (req, res) {
  // Post.find({},function(err,posts)
  // {
  // return res.render('home',{
  //   title:" Home",
  //   posts:posts
  // })

  // })

  //populate the user of each
  Post.find({})
    .populate("user")
    .exec(function (err, posts) {
      return res.render("home", {
        title: " Home",
        posts: posts,
      });
    });
};

//module.exports.actionName=function(req,res){}

module.exports.notifications = function (req, res) {
  return res.end("<h1>notifications are here</h1>");
};
