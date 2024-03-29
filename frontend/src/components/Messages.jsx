import useGetMessages from "../hooks/useGetMessages";
import { useAuthContext } from "../context/AuthContext"

import PropTypes from 'prop-types';
import useConversation from "../zustand/useConversation";
import { useEffect, useRef } from "react";
const Messages = () => {
  const{messages,loading} = useGetMessages();
  console.log("messages",messages);
  const lastref = useRef();

  useEffect(()=>{
    setTimeout(()=>{
      if(lastref.current){
      lastref.current.scrollIntoView({behavior:"smooth"});}
    },100);
  },[messages]);

  return (
    <div className="px-4 flex-1 overflow-auto  ">
      {loading ? <span className="loading loading-spinner mx-[100px] my-[150px] md:mx-[180px] md:my-[170px]  w-[40px]"></span>:null}
      {!loading && messages.length === 0 ?<p className="text-center mt-2">Send a message to start the conversation</p>:null}
      {messages.map((message)=>{
        return (<div key={message._id} ref={lastref} >
          <Message  message={message}  />
        </div>)
      })}
      {/* <Message /> */}

    </div>
  );
};

export default Messages;

const Message = ({message}) => {
  const {authUser}= useAuthContext();
  const {selectedConversation} = useConversation();
  const fromMe = message.senderId === authUser._id;
  const classy = fromMe ? "chat chat-end" : "chat chat-start";
  const bubbleColor = fromMe ? "bg-blue-500" : "bg-base-300";
  const profilePicture = fromMe ? authUser.profilePicture : selectedConversation.profilePicture;

  return (
    <div className={`${classy}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            src={profilePicture ||"https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"}
            alt="user avatar"
          />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleColor}`}>
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {new Date(message.createdAt).toLocaleString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
      </div>
    </div>
  );
};

Message.propTypes = {
  message: PropTypes.object.isRequired,
};