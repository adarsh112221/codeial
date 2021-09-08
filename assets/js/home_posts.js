{ //method to submit the form data using ajax
  let createPost = function () {
    let newPostForm = $("#new-post-form");
    newPostForm.submit(function (e) {
      e.preventDefault(); //now the post wont submit and we have to do it manually using ajax
      $.ajax({
          type:'post',
          url:'/posts/create',
          data:newPostForm.serialize(),
          success:function(data){
            let newPost=newPostDom(data.data.post);
            $('#posts-list-container>ul').prepend(newPost);
          },
          error: function(error)
          {
              console.log(error.responseText);
          }

      })
    });
  };
  //method to create a post in dom
  let newPostDom=function(post)
  {
    return $(`<li id="post-${post._id}">
    <p>
     
      <small>
        <a class="delete-post-button" href="/posts/destroy/${post.id}">X</a>
      </small>
      ${post.content}
  </br>
  <small>
  ${post.user.name}
  </small>
  </p>
  <div class="post-comments">
   <form action="/comments/create" method="POST">
   <input type="text" name="content" placeholder="Type Here To Add Comment ...">
   <input type="hidden" value="${post._id}" name="post">
   <input type="submit" value="Add Comment">
     
  </form>
  <div class="post-comments-list">
    <ul id="post-comment-${post._id}">
    </ul>
  </div>
  </div></li>`)}
    


  createPost();
}
