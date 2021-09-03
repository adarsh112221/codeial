const Comment = require("../models/comment");
const Post = require("../models/post");
module.exports.create = function (req, res) {
  Post.findById(req.body.post, function (err, post) {
    if (post) {
      Comment.create(
        {
          content: req.body.content,
          post: req.body.post,
          user: req.user._id,
        },
        function (err, comment) {
          //handle err

          post.comments.push(comment);
          post.save();
          res.redirect("/");
        }
      );
    }
  });
};

module.exports.destroy = function (req, res) {
  Comment.findById(req.params.id, function (err, comment) {
    if (req.user.id == comment.user) {
      let postId = comment.post;
      comment.remove(); //to remove the comment from the db
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
