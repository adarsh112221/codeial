const passport=require('passport')
//we also need rthe local strategy that we installed
const localStrategy=require("passport-local").Strategy

const User=require('../models/user')
//we need to tell passport to use this local strategy that we have created 

//authonticaion use passport
passport.use(new localStrategy({
    usernameField:'email'
},
function(email,password,done){
//find the user and establish the identity 
User.findOne({email:email},function(err,user){
    if(err)
    {
        console.log("error in finding the user ---> passport")
        return done(err)
    }
    if(!user ||user.password!=password)
    {
      console.log('invali user name and password')
      return done(null,false)
    }
    return done(null,user)})
}
))


//serialising the user to deside which key is to be kept in the cookie

passport.serializeUser(function(user,done)
{
    done(null,user.id);
})


//deserilising the user from the key in the cookie

passport.deserializeUser(function(id,done)
{
    User.findById(id,function(err,user)
    {
        if(err)
        {
            console.log("error in finding the user ---> passport")
            return done(err)
        }
        return done(null,user)

    })
})
module.exports=passport