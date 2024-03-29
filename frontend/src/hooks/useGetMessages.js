import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import axios from "axios";
import toast from "react-hot-toast";

const useGetMessages = ()=>{
    const[loading,setLoading] = useState(false);
    const {messages,setMessages,selectedConversation} = useConversation();
    const id = selectedConversation?._id;
    
    useEffect(()=>{
        const getMessages = async()=>{
            setLoading(true);
            try {
                const response = await axios.get(`/api/message/${id}`);
                if(!response.data.success){
                    toast.error("Internal Server Error");
                    throw new Error("Internal_Server_Error");
                }
                setMessages(response.data.messages);
            } catch (error) {
                console.log("useGetMessages error ", error);
                toast.error("Internal Server Error");
            }finally{
                setLoading(false);
            }
        };
        if(id) getMessages();

    },[id, setMessages]);

    return{messages,loading}
}

export default useGetMessages;