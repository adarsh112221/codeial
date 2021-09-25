const nodeMailer = require("../config/nodemailer");

//i need to make a function which will create that mail
/*
exports.newComment is same as
const newComment=function()
{

}
module.exports=newComment
this is another way of exporting the functions
*/
exports.newComment = (comment) => {
  // console.log("inside new comment mailer",comment);
  let htmlString = nodeMailer.rendertemplate(
    { comment: comment },
    "/comments/new_comments.ejs"
  ); //this is for the functioon we have with relative path
  nodeMailer.transpoter.sendMail(
    {
      from: "adarshpandey11222@gmail.com",
      to: comment.user.email,
      subject: "new comment published",
      html: htmlString,
    },
    (err, info) => {
      if (err) {
        console.log("error in publishing the mail");
        return;
      }
      console.log("message is send", info);
      return;
    }
  );
};
