import useGetUserConversations from "../hooks/useGetUserConversation";
import PropTypes from "prop-types";
import { getRandomEmoji } from "../utils/emoji";
import useConversation from "../zustand/useConversation.js";
import { useSocketContext } from "../context/SocketContext.jsx";

const Conversations = () => {
  const { loading, conversations } = useGetUserConversations();
  
  // console.log("conversations",conversations);
 
  return (
    <div className="py-2 flex flex-col  h-[280px] overflow-auto   md:h-[380px]">
      {conversations.map((conversation,idx) => {
        return (
          <Conversation key={conversation._id} conversation={conversation} emoji={getRandomEmoji()} lastIndex={idx === conversations.length-1} />
        );
      })}
      {loading ? <span className="loading loading-spinner mx-auto"></span>:null}
    </div>
  );
};

export default Conversations;

const Conversation = ({ conversation,emoji,lastIndex }) => {
  // Component code here
  const {selectedConversation, setSelectedConversation} = useConversation();
  const isSelected = selectedConversation?._id === conversation._id;
  const {onlineusers} = useSocketContext();
  // console.log(onlineusers)
  const isOnline = onlineusers.includes(conversation._id);

  return (
    <div className="">
      <div className={`flex items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer gap-2 ${isSelected ? "bg-sky-500":""}`} onClick={()=>{
        setSelectedConversation(conversation);
      }}>
        <div className={`avatar ${isOnline ? "online":null}`}>
          <div className="w-12 rounded-full">
            <img
              src={
                conversation.profilePicture ||
                "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              }
              alt="user avatar"
            />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex  justify-between pr-4">
            <p className="font-bold text-gray-200 ">{conversation.fullName}</p>
            <span className="text-xl ">{emoji}</span>
          </div>
        </div>
      </div>
      {lastIndex ? null :<div className="divider my-0 py-0 h-1"></div>}
    </div>
  );
};
Conversation.propTypes = {
  conversation: PropTypes.object.isRequired,
  emoji: PropTypes.string.isRequired,
  lastIndex: PropTypes.bool.isRequired,
};
