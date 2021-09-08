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
              console.log(data);
          },
          error: function(error)
          {
              console.log(error.responseText);
          }

      })
    });
  };
  //method to create a post in dom
  createPost();
}
