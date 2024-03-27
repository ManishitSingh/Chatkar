import {Schema,model} from "mongoose";

const messageSchema = new Schema({
    senderId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    receiverId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    message:{
        type:String,
        required:true
    },

}, {timestamps: true});

const Message = model("Message",messageSchema);

export default Message;