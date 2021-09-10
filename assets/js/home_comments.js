let createComment = function (postId) {
  let newCommentForm = $(`#post-${postId}-comments-form`);
  newCommentForm.submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/comments/create",
      data: newCommentForm.serialize(),
      success: function (data) {
        let commentx = data.data.comment;
        console.log(data.data);
        let newComment = newCommentDom(commentx);
        $(`#post-comments-list>post-comment-${postId}`).prepend(newComment);
      },
      error: function (error) {
        console.log(error.responseText);
      },
    });
  });
};
let newCommentDom = function (comment) {
  return $(`<li  id="comment-${comment._id}>
   <p>
     <a class="delete-comment-button" href="/comments/destroy/${comment._id}">x</a>
     ${comment.content}
     <br />
     <small> ${comment.user} </small>
   </p>
 </li>`);
};
createComment();
