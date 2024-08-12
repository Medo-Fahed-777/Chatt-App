import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  firstName:{
    type:String,
    required:true,
  },
  lastName:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true,
    unique:true,
  },
  password:{
    type:String,
    required:true,
    minlength:6
  },
  phone:{
    type:Number,
    required:true,
    unique:true,
    minlength:10
  },
  profilePic:{
    type:String,
    default:""
  },
},{timestamps:true})

const User = mongoose.model('User',userSchema)
export default User