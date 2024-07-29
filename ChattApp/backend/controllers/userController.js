import User from "../models/userModel.js";
import Conversation from '../models/conversationModel.js'
import Msg from '../models/messageModel.js'

export const getAllClients = async ( req , res ) => {
  try {
    const loggedInUserId = req.user._id
  
    const clients = await User.find({_id:{ $ne:loggedInUserId }, role:'client'})
    // console.log('Clients',clients);
    const clientsWithLastMessage = await Promise.all(clients.map(async (client) => {
      // console.log('Client',client);
      const conversation = await Conversation.findOne({participants:{$all:[loggedInUserId,
        client._id]}})
        let lastMessage = null
        if (conversation) {
          const messageId = conversation.msgs[conversation.msgs.length - 1]
          const lastMsg = await Msg.findById(messageId)
          if (lastMsg) {
            lastMessage = lastMsg.msg
          }
        }
        const firstName = client.firstName
        const lastName = client.lastName
        const profilePic = client.profilePic
        return{
          _id:client._id,
          firstName,
          lastName,
          profilePic,
          lastMessage
        }
    }))
    res.status(200).json( clientsWithLastMessage)

  } catch (error) {
    console.log('Error in getAllClients :' , error.message);
    res.status(500).json({error: 'Internal Server Error!'})
  }
}
// -------------------------------------- getAllDoctors -------------------------------- //
export const getAllDoctors = async (req, res) => {
  try {
    const loggedInUserId = req.user._id
    
    const doctors = await User.find({ _id: { $ne: loggedInUserId }, role: 'doctor' })
    // console.log('Doctors:', doctors); // Add this line to check the doctors data
    
    const doctorsWithLastMessage = await Promise.all(doctors.map(async (doctor) => {
      // console.log('Doctor:', doctor); // Add this line to check each doctor data
      const conversation = await Conversation.findOne({ participants: { $all: [loggedInUserId, doctor._id] } })
      let lastMessage = null
      if (conversation) {
        const messageId = conversation.msgs[conversation.msgs.length - 1]
        const lastMsg = await Msg.findById(messageId)
        if (lastMsg) {
          lastMessage = lastMsg.msg
        }
      }
      const firstName = doctor.firstName
      const lastName = doctor.lastName
      const profilePic = doctor.profilePic
      return { 
        _id: doctor._id,
        firstName,
        lastName,
        profilePic,
        lastMessage
      }
    }))
    res.status(200).json({doctors: doctorsWithLastMessage })

  } catch (error) {
    console.log('Error in getAllDoctors :', error.message);
    res.status(500).json({ error: 'Internal Server Error!' })
  }
}

// ----------------------------- Not Used Function ------------------------------------ //

export const getContacts = async (req, res) => {
  try {
    const userId = req.user._id;

    const conversations = await Conversation.find({
      participants: userId
    })
    .populate({path: 'msgs',options: { sort: { createdAt: -1 } },perDocumentLimit: 1})
    .populate({
      path: 'participants',
      populate: {
        path: '_id',
        model: 'User',
        // select: 'role firstName lastName'
      }
    });
    // console.log('Conversations:', conversations);

    const contacts = conversations.reduce((acc, conversation) => {
      // console.log('Conversation participants:', conversation.participants);
      const otherParticipants = conversation.participants.filter(participant => participant._id.toString()!== userId);
      // console.log('Other participants:', otherParticipants);
      otherParticipants.forEach(participant => {
        const lastMsg = conversation.msgs[0];
        // const receiver = conversation.participants.find(p => p._id.toString() !== participant._id.toString())._id; // Get the ID of the other participant
        acc.push({
          contactId: participant._id,
          // receiveId:receiver,
          lastMsg: lastMsg.msg
        });
      });
      return acc;
    }, []);

    console.log('Contacts:', contacts);

    res.status(200).json({ contacts });
  } catch (error) {
    console.log('Error in getContacts Controller', error.message);
    res.status(500).json({ error: 'Internal Server Error!' });
  }
}