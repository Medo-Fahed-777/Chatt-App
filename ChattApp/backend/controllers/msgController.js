import Conversation from "../models/conversationModel.js";
import Msg from "../models/messageModel.js";
import { getReceiverSocketId } from "../socket/socket.js";
import { io } from "../socket/socket.js";

export const sendMsg = async (req , res) => {
  try {
    const {msg} = req.body
    const {id:receiverId} = req.params
    const senderId = req.user._id
    // console.log(msg,'msg',receiverId,'id',senderId,'sender');
    let conversation = await Conversation.findOne({
      participants:{ $all : [senderId , receiverId]}
    })
    if(!conversation){
      conversation = await Conversation.create({
        participants: [senderId , receiverId]
      })
    }
    const newMsg = new Msg({
      senderId,
      receiverId,
      msg
    })
    if(newMsg){
      conversation.msgs.push(newMsg._id)
    }
    console.log(newMsg,'newMsg');
    res.status(201).json({msg : newMsg})
    await Promise.all([ conversation.save(), newMsg.save()])
    // Socket Io Functionality  

    const receiverSocketId = getReceiverSocketId(receiverId)

    if(receiverId){

      io.to(receiverSocketId).emit('newMsg',newMsg)
    }

  } catch (error) {
    console.log('Error in sendMsg Controller' , error.message);
    res.status(500).json({error:'Internal Server Error!'})
  }
} 
export const getMsgs = async (req,res) => {
  
  try {
    const {id:userToChatId} = req.params
    const senderId = req.user._id
    const conversation = await Conversation.findOne({
      participants:{ $all : [senderId , userToChatId]}
    }).populate('msgs')

    if(!conversation){
      return res.status(200).json([])
    }

    const msgs = conversation.msgs;
    await Msg.updateMany({ _id: { $in: msgs } }, { $set: { isSeen: true } });

    res.status(200).json(msgs)

  } catch (error) {
    console.log('Error in getMsg Controller' , error.message);
    res.status(500).json({error:'Internal Server Error!'})
  }
}

