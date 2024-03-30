import { useEffect } from "react";
import useConversation from "../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import {TiMessages} from 'react-icons/ti'; 
import { useAuthContext } from "../context/AuthContext";

const MessageContainer = () => {
    // const chatSelected = true;
    const {selectedConversation,setSelectedConversation} = useConversation();

    useEffect(()=>{
      //cleanup function (unmounts)
      return () =>{
        setSelectedConversation(null);
      }
    },[setSelectedConversation]);

  return (<>
    {selectedConversation?(<div className="md:min-w-[450px] flex flex-col h-full ">
      <div className=" h-14 bg-base-300 opacity-1 rounded-tr-md text-gray-100 font-medium  p-2 px-4 flex flex-col justify-center">
        <div className="flex  gap-2 items-center ">
          <div className="avatar ">
            <div className="w-8 rounded-full">
              <img
                src={selectedConversation.profilePicture ||"https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"}
                alt="user avatar"
              />
            </div>
          </div>

          <div className=" ">{selectedConversation.fullName}</div>
        </div>
      </div>
      {/*  */}
      <Messages /> 
       <MessageInput />

    </div>):<NochatSelected />}
    </>
  );
};

export default MessageContainer;

const NochatSelected = () => {
  const{authUser} = useAuthContext();
  return (
    <div className="h-full w-full flex items-center justify-center ">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser.fullName} </p>
        <p>Select a chat to start messaging</p>
        <TiMessages className=" text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
