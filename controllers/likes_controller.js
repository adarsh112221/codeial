const Like = require("../models/post");
module.exports.toggle = async function (req, res) {
  try {
     let likeable,deletelike=false
     if (req.query.type == 'Post'){
        likeable = await Post.findById(req.query.id).populate('likes');
    }else{
        likeable = await Comment.findById(req.query.id).populate('likes');
    }
    let existingLike=await Like.findOne({
        user: req.user._id,
        likeable: req.query.post_id,
        onModel: req.query.type,
    })
    if(existingLike)
    {
      deletelike=true;
      likeable.likes.pull(existingLike._id)
      likeable.save()
      existingLike.remove();
    
    }else{
        let likedobject = await Like.create({
            user: req.user._id,
            likeable: req.query.post_id,
            onModel: req.query.type,
          });
      deletelike=false;
      likeable.likes.push(newLike._id);
      likeable.save();


    }
     
      return res.status(200).json({
          data:{
           deletelike:deletelike
          },
          message:'Unliked the post'
      })
   
  } catch {
    return res.status(500).json({
      message: "comment is not deleted",
    });
  }
};
