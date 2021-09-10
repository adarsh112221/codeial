const Comment = require("../models/comment");
const Post = require("../models/post");
module.exports.create = async function (req, res) {
  try {
    let post = await Post.findById(req.body.post);
    if (post) {
      let comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });
      post.comments.push(comment);
      post.save();
      let comment1 = await Comment.findById(comment._id)
        .populate("post")
        .populate("user", "name");
      if (req.xhr) {
        return res.status(200).json({
          data: {
            comment: comment1,
          },
          message: "comment created",
        });
      }

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
      
      if (req.xhr) {
        return res.status(200).json({
          data: {
            comment_id: req.params.id,
          },
          message: "comment removed",
        });
      }
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
