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
  gender:{
    type:String,
    enum:['male','female']
  },
  profilePic:{
    type:String,
    default:""
  },
  role:{
    type:String,
    required:true,
    enum:['doctor','client'],
  },
  university:{
    type:String,
  },
  location:{
    type:String,
  },
  yearOfStudy:{
    type:Number
  },
  studentId:{
    type:String,
  },
  birthDate:{
    type:String
  },
  workDays:{
    type:Object
  },
  services:{
    type:Array
  } 
},{timestamps:true})

const User = mongoose.model('User',userSchema)
export default User