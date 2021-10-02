$(".likes").each(function () {
  $(this).on("click", function (e) {
    e.preventDefault();
    let likevalue = $(this).find(" .post-likes-value");
    $ajax({
      type: "post",
      url: likevalue.attr("href"),
      success: function (data) {
        console.log("successfully liked the post")
      },
      error: function (error) {
        console.log("error in completing the request", error.responseText);
      },
    });

    //there is also a new way of liking the pictures but we will not use that
  });
});
