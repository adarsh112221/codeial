const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
const env = require("./enviornment");
let transpoter = nodemailer.createTransport(env.smtp);
//we want to define that we will be using ejs for that we will define a template renderer

let rendertemplate = (data, relativePath) => {
  let mailHTML;
  ejs.renderFile(
    //i need to provide a path
    path.join(__dirname, "../views/mailers", relativePath), //this relative path is the place from where this function is called
    data,
    function (err, template) {
      if (err) {
        console.log("error in rendering the template");
        return;
      }
      mailHTML = template;
    }
  );

  return mailHTML;
};

module.exports = {
  transpoter: transpoter,
  rendertemplate: rendertemplate,
};
