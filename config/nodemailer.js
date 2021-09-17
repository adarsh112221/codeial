const nodemailer=require('nodemailer')
const ejs=require('ejs')
let transpoter=nodemailer.createTransport({
    service:'gmail',
    host:"smtp.gmail.com",
    secure:false,
    auth:{
        user:'adarshpandey11222',
        pass:'2019B401007'
    }

});
//we want to define that we will be using ejs for that we will define a template renderer

let rendertemplate=(data,relativePath)=>{
let mailHTML;
ejs.renderFile(
    //i need to provide a path
    path.join(__dirname,'../views/mailers',relativePath)//this relative path is the place from where this function is called
    ,data,
    function(err,template)
    {
        if(err)
        {console.log('error in rendering the template');return}
        mailHTMl=template;
    }
)

return mailHTML
}
