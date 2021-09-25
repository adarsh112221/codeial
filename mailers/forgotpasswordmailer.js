const nodeMailer = require("../config/nodemailer");

//here we need to make a function which will create a mail

exports.newPassword = (forgetpassword) => {
  console.log("inside newPassword mailer", forgetpassword);
  let htmlString = nodeMailer.rendertemplate(
    { forgetpassword: forgetpassword },
    "/forgetpassword/new_password_url.ejs"
  );
  nodeMailer.transpoter.sendMail(
    {
      from: "adarshpandey11222@gmail.com",
      to: forgetpassword.user.email,
      subject: "reset Password",
      html: htmlString,
    },
    (err, info) => {
      if (err) {
        console.log("error in resetting the password");
        return;
      }
      console.log("password reset mail sent", info);
      return;
    }
  );
};
