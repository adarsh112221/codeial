const queue=require('../config/kue');
const commentsMailer=require('../mailers/commentsmailer')
//this queue process takes in 2 argument 1 the data which needs to be prossesed 2nd the job that we need to do
//the process function calls the mailer
queue.process('emails',function(job,done)
{
     console.log('emails worker is proccessing a job',job.data);//it holds the data that is send i.e the comments
     commentsMailer.newComment(job.data);
     done();
})
//now we have putted it here we need to call the worker from here