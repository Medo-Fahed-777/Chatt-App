import User from "../models/userModel.js";
import Conversation from '../models/conversationModel.js'
import Msg from '../models/messageModel.js'

export const getAllUsers = async ( req , res ) => {
  try {
    const loggedInUserId = req.user._id
  
    const users = await User.find({_id:{ $ne:loggedInUserId }})
    // console.log('Clients',clients);
    const clientsWithLastMessage = await Promise.all(users.map(async (user) => {
      // console.log('Client',client);
      const conversation = await Conversation.findOne({participants:{$all:[loggedInUserId,
        user._id]}})
        let lastMessage = null
        if (conversation) {
          const messageId = conversation.msgs[conversation.msgs.length - 1]
          const lastMsg = await Msg.findById(messageId)
          if (lastMsg) {
            lastMessage = lastMsg.msg
          }
        }
        const firstName = user.firstName
        const lastName = user.lastName
        const profilePic = user.profilePic
        return{
          _id:user._id,
          firstName,
          lastName,
          profilePic,
          lastMessage
        }
    }))
    res.status(200).json( clientsWithLastMessage)

  } catch (error) {
    console.log('Error in getAllUsers :' , error.message);
    res.status(500).json({error: 'Internal Server Error!'})
  }
}
