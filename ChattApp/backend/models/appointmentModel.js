import mongoose from "mongoose";

const appointmentSchema = mongoose.Schema({
  doctorId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  service:{
    type:String,
    enum:['Dental Treatment','Orthodontics','Oral Hygiene','Cosmetic Dentistry'],
    required:true,
  },
  state:{
    type:String,
    enum:['pending','rejected','approved'],
    default:'pending'
  },
  date:{
    type:Date,
    required:true
  },
  time:{
    type:String,
    required:true
  },
  description:{
    type:String,
  },
  location:{
    type:String
  }

},{timeStamps:true})

const Appointment = mongoose.model('Appointment', appointmentSchema)

export default Appointment