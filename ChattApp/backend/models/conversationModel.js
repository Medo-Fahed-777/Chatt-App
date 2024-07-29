import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
  participants:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:'User'
    }],
    msgs:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Msg',
        default:[]
      }
    ]
},{timestamps:true})

const Conversation = mongoose.model('Conversation' , conversationSchema)

export default Conversation