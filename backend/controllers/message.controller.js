import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getRecieverSocketId, io } from "../socket/socket.js";


export const getMessages = async(req,res)=>{
    try {
        const { id: receiverId } = req.params; // receiverId here is the id of the user to get messages from or you chat to
        const senderId = req.user._id;
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        }).populate("messages");//populate here provides with all the messages in the conversation not just the ids
        if(!conversation){
            return res.status(200).json({ messages: [], success: true });
        }
        res.status(200).json({ messages: conversation.messages, success: true });


    } catch (error) {
        console.log("Get Messages Route", error);
        return res
            .status(500)
            .json({ Error: "Internal Server Error", success: false });
    }
    

}


//function to send message from user to another and create a conversation between them if it doesnt,exist
export const sendMessage = async (req, res) => {
  
  try {
    const { id: receiverId } = req.params;//receiverId from the route
    const { message } = req.body;
    const senderId = req.user._id;//from the token of current logged in user

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = new Conversation({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      message,
      receiverId,
    });
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    const recieverId = getRecieverSocketId(receiverId);
    console.log(recieverId);
    if(recieverId){
      //io.to(socketid).emit is used to send events to specific client
      // console.log("n")
      io.to(recieverId).emit("newMessage",newMessage);
    }
    //Socket.io here

    //this will run in parallel
    await Promise.all([conversation.save(), newMessage.save()]);
    res.status(201).json({ newMessage, success: true });


  } catch (error) {
    console.log("Send Message Route", error);
    return res
      .status(500)
      .json({ Error: "Internal Server Error", success: false });
  }
};
