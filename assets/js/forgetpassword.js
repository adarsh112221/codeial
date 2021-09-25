//ajax method to send mail for forget password
{
  let sendEmail = function () {
    let forgetEmail = $("#forget-password-form");
    forgetEmail.submit(function (e) {
      e.preventDefault();

      $.ajax({
        type: "post",
        url: "/users/new-password",
        data: forgetEmail.serialize(),
        success: function (data) {
          new Noty({
            theme: "relax",
            text: "email have been send to the user",
            type: "success",
            layout: "topRight",
            timeout: 1500,
          }).show();
          console.log(data)
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });

      let email = $("#forget-user-email").val();
      console.log(email);
    });
  };
  sendEmail();
}
