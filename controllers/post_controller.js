const Post = require("../models/post");
const Comment = require("../models/comment");
const Like = require("../models/like");
module.exports.create = async function (req, res) {
  try {
    let post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });
    let post1 = await Post.findById(post._id).populate("user", "name");
    if (req.xhr) {
      return res.status(200).json({
        data: {
          post: post1,
        },
        message: "Post created",
      });
    }
    req.flash("success", "Post created successfully");
    return res.redirect("back");
  } catch (err) {
    req.flash("error", err);
    return res.redirect("back");
  }
};
module.exports.destroy = async function (req, res) {
  try {
    let post = await Post.findById(req.params.id);

    //.id means converting the object id into string
    if (post.user == req.user.id) {
      post.remove(); //to remove post from the database
      await Like.deleteMany({ likeable: post._id, onModel: "Post" });
      await Like.deleteMany({ _id: { $in: post.comments } });
      await Comment.deleteMany({ post: req.params.id });
      if (req.xhr) {
        return res.status(200).json({
          data: {
            post_id: req.params.id,
          },
          message: "post removed",
        });
      }
      req.flash("success", "Post Deleted successfully");

      return res.redirect("back");
    } else {
      return res.redirect("back");
    }
  } catch (err) {
    req.flash("error", "You Can not delete this post");
    return res.redirect("back");
  }
};
