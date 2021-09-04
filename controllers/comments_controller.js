const Comment = require("../models/comment");
const Post = require("../models/post");
module.exports.create = async function (req, res) {
  try {
    let post = await Post.findById(req.body.post);
    if (post) {
      let comment=await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });
      req.flash("success", "Comment Created successfully");
      post.comments.push(comment);
      post.save();
      res.redirect("/");
    }

  } catch (err) {
    console.log("error", err);
  }

  // Post.findById(req.body.post, function (err, post) {
  //   if (post) {
  //     Comment.create(
  //       {
  //         content: req.body.content,
  //         post: req.body.post,
  //         user: req.user._id,
  //       },
  //       function (err, comment) {
  //         //handle err

  //         post.comments.push(comment);
  //         post.save();
  //         res.redirect("/");
  //       }
  //     );
  //   }
  // });
};

module.exports.destroy = function (req, res) {
  Comment.findById(req.params.id, function (err, comment) {
    if (req.user.id == comment.user) {
      let postId = comment.post;
      comment.remove(); //to remove the comment from the db
      req.flash("success", "Comment Deleted successfully");
      
      Post.findByIdAndUpdate(
        postId,
        { $pull: { comments: req.params.id } },
        function (err, comments) {
          return res.redirect("back");
        }
      );
    } else {
      return res.redirect("back");
    }
  });
};
