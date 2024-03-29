import axios from "axios";
import { useState } from "react";
import useConversation from "../zustand/useConversation.js";
import toast from "react-hot-toast";


const useSendMessage = ()=>{
    const [loading,setLoading] = useState(false);
    const {selectedConversation,messages,setMessages} = useConversation();
    // console.log("messages",messages);  
    // console.log("selectedConversation",selectedConversation);
    const id = selectedConversation?._id;
    const sendMessage = async(message)=>{
        // console.log("message",message);
        setLoading(true);
        try {
            const response = await axios.post(`/api/message/send/${id}`,{message},{
                headers:{
                    "Content-Type":"application/json"
                }
            });
           if(!response.data.success){
               toast.error("Internal Server Error");
               throw new Error("Internal_Server_Error");
           }
           setMessages([...messages,response.data.newMessage]);
        } catch (error) {
            console.log("useSendMessage error ", error);
            toast.error("Internal Server Error");
        }finally{
            setLoading(false);
        }
    }
    return {sendMessage,loading};
}

export default useSendMessage;