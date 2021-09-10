function createComment(postId) {
  let newCommentForm = $(`#post-${postId}-comments-form`);
  console.log(newCommentForm);
  newCommentForm.submit(function (e) {
    e.preventDefault();
    let self = this;

    $.ajax({
      type: "post",
      url: "/comments/create",
      data: $(self).serialize(),
      success: function (data) {
        new Noty({
            theme: "relax",
            text: "Comment published!",
            type: "success",
            layout: "topRight",
            timeout: 1500,
          }).show();
        let newComment = newCommentDom(data.data.comment);
        $(`#post-comments-${postId}`).prepend(newComment);
      },
      error: function (error) {
        console.log(error.responseText);
      },
    });
  });
}

let newCommentDom = function (comment) {
  return $(`<li id="comment-${comment._id}">
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
let deleteComment = function (deleteLink) {
  $(deleteLink).click(function (e) {
    e.preventDefault();
    $.ajax({
      type: "get",
      url: $(deleteLink).prop("href"),
      success: function (data) {
        new Noty({
          theme: "relax",
          text: "Comment udgaya",
          type: "success",
          layout: "topRight",
          timeout: 1500,
        }).show();
        $(`#comment-${data.data.comment_id}`).remove();
      },
      error: function (error) {
        console.log(error.responseText);
      },
    });
  });
};
convertdeletetoAjax1=function(postid)
{
  $(`#post-comments-${postid}>li`).each(function()
  {
    let self=$(this);
    let deleteButton=$(' .delete-comment-button', self);
    deleteComment(deleteButton);
  })

}