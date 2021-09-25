const queue = require("../config/kue");
const forgotpasswordMailer = require("../mailers/forgotpasswordmailer");

//the process function calls the mailer
queue.process("forgetemails", function (job, done) {
  console.log("email worker is proccessing a job", job.data); //this thing holds the data which have been sent
  forgotpasswordMailer.newPassword(job.data);
  done();
});
