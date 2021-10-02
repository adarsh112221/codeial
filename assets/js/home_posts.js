{
  //method to submit the form data using ajax
  let createPost = function () {
    let newPostForm = $("#new-post-form");
    newPostForm.submit(function (e) {
      e.preventDefault(); //now the post wont submit and we have to do it manually using ajax
      $.ajax({
        type: "post",
        url: "/posts/create",
        data: newPostForm.serialize(),
        success: function (data) {
          new Noty({
            theme: "relax",
            text: "post created succefully",
            type: "success",
            layout: "topRight",
            timeout: 1500,
          }).show();
          let newPost = newPostDom(data.data.post);
          $("#posts-list-container>ul").prepend(newPost);
          deletePost($(" .delete-post-button", newPost)); //this object has this class inside it
          createComment(data.data.post._id);
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  };
  //method to create a post in dom
  let newPostDom = function (post) {
    return $(`<li id="post-${post._id}">
    <p>
     
      <small>
        <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
      </small>
      ${post.content}
  </br>
  <small>
  ${post.user.name}
  </small>
  </p>
  <div class="post-comments">
   <form id="new-${post._id}-comments-form" action="/comments/create" method="POST">
   <input type="text" name="content" placeholder="Type Here To Add Comment ...">
   <input type="hidden" value="${post._id}" name="post">
   <input type="submit" value="Add Comment">
     
  </form>
  <div class="post-comments-list">
    <ul id="post-comments-${post._id}">
    </ul>
  </div>
  </div></li>`);
  };
  //method to delete the post
  let deletePost = function (deleteLink) {
    $(deleteLink).click(function (e) {
      e.preventDefault();
      $.ajax({
        type: "get",
        url: $(deleteLink).prop("href"),
        success: function (data) {
          new Noty({
            theme: "relax",
            text: "post deleted",
            type: "success",
            layout: "topRight",
            timeout: 1500,
          }).show();
          $(`#post-${data.data.post_id}`).remove();
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  };
  convertdeletetoAjax = function () {
    $("#posts-list-container>ul>li").each(function () {
      let self = $(this);
      let deleteButton = $(" .delete-post-button", self);
      deletePost(deleteButton);
      let postId = self.prop("id").split("-")[1];
      convertdeletetoAjax1(postId);
      createComment(postId);
    });
  };
  createPost();
  convertdeletetoAjax();
  createComment();
}
