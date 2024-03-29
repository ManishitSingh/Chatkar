// import React from 'react'
import { BsSend } from "react-icons/bs";
import { useState } from "react";
import useSendMessage from "../hooks/useSendMessage";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const {loading,sendMessage} = useSendMessage();
  // console.log(loading);
  const handleSubmit = async(e) => {
    e.preventDefault();
    // console.log(message);
    if (!message.trim()) return;
    await sendMessage(message);
    setMessage("");
  };
  return (
    <form className="px-4 my-3" action="" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5  bg-base-300 border-gray-600 text-white"
          placeholder="Send a message"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          {loading ? (<span className="loading loading-spinner"></span>):<BsSend />}
          
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
