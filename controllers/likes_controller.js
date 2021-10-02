const Like = require("../models/like");
const Post = require("../models/post");
const Comment = require("../models/comment");
module.exports.toggle = async function (req, res) {
  try {
    let likeable;
    let deletelike = false;
    if (req.query.type == "Post") {
      likeable = await Post.findById(req.query.id).populate("likes");
    } else {
      likeable = await Comment.findById(req.query.id).populate("likes");
    }
    let existingLike = await Like.findOne({
      user: req.user._id,
      likeable: req.query.id,
      onModel: req.query.type,
    });
    if (existingLike) {
      deletelike = true;
      likeable.likes.pull(existingLike._id);
      likeable.save();
      existingLike.remove();
    } else {
      let likedobject = await Like.create({
        user: req.user._id,
        likeable: req.query.id,
        onModel: req.query.type,
      });
      likeable.likes.push(likedobject._id);
      likeable.save();
    }
    return res.json(200, {
      message: "Request successful!",
      data: {
        deletelike: deletelike,
      },
    });
  } catch (err) {
    return res.json(500, {
      message: "Request unsucessful!",
    });
  }
};
