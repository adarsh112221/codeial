$("#add-friends-button-link").on("click", function (e) {
  e.preventDefault();
  $.ajax({
    type: "POST",
    url: $("#add-friends-button-link").attr("href"),
    success: function (data) {
      new Noty({
        theme: "relax",
        text: "friend added successfully",
        type: "success",
        layout: "topRight",
        timeout: 1500,
      }).show();
      $("#add-friends-button-link").html(`remove Friend`);
    },
    error: function (error) {
      console.log("error in completing the request", error.responseText);
    },
  });
});
