const Post = require("../../../models/post");
const Comment = require("../../../models/comment");
module.exports.index = async function (req, res) {
  let posts = await Post.find({})
    .populate("user")
    .sort("-createdAt")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    });
  return res.status(200).json({ message: "list of posts", posts: posts });
};

module.exports.destroy = async function (req, res) {
  try {
    let post = await Post.findById(req.params.id);

    //.id means converting the object id into string
    // if (post.user == req.user.id) {
    post.remove(); //to remove post from the database
    await Comment.deleteMany({ post: req.params.id });
    return res.json(200, {
      message: "post and associated comments deleted successfully",
    });
    // } else {
    //   return res.redirect("back");
    // }
  } catch (err) {
    return res.json(500, { message: "internal server error" });
  }
};
