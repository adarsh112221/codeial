$(".likes").each(function () {
  $(this).on("click", function (e) {
    e.preventDefault();
    let likesCount = $(this).find(" .likes-value");
    console.log(likesCount.text())
    $.ajax({
      type: "POST",
      url: likesCount.attr("href"),
      success: function (data) {
        likesCountvalue = parseInt(likesCount.attr("data-likes"));
        if (data.data.deletelike == true) {
          likesCountvalue -= 1;
        } else {
          likesCountvalue += 1;
        }
        likesCount.attr("data-likes", likesCountvalue);
        likesCount.html(`${likesCountvalue} Likes`);
      },
      error: function (error) {
        console.log("error in completing the request", error.responseText);
      },
    });

    //there is also a new way of liking the pictures but we will not use that
  });
});
