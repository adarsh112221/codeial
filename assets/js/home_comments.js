let createComment = function (postId) {
  let newCommentForm = $(`#post-${postId}-comments-form`);

  newCommentForm.submit(function (e) {
    e.preventDefault();
    console.log(newCommentForm.serialize());
    $.ajax({
      type: "post",
      url: "/comments/create",
      data: newCommentForm.serialize(),
      success: function (data) {
        let commentx = data.data.comment;
        console.log(data.data.comment.content);
        let newComment = newCommentDom(commentx);
        $(`#post-comments-${postId}`).prepend(newComment);
      },
      error: function (error) {
        console.log(error.responseText);
      },
    });
  });
};
let newCommentDom = function (comment) {
  return $(`<li id="comment-${ comment._id }">
  <p>
      
      <small>
          <a class="delete-comment-button" href="/comments/destroy/${comment._id}">X</a>
      </small>
      
      ${comment.content}
      <br>
      <small>
          ${comment.user.name}
      </small>
  </p>    

</li>`);
};
createComment();
