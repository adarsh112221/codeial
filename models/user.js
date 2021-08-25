const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password:{
      type:String,
      required:true,
  },
  name:{
      type:String,
      required:true
  }},
  {
      timestamps:true
  
});
const User=mongoose.mode;("User",userSchema);
module.exports=User;
