const Conversations = () => {
  return (
    <div className="py-2 flex flex-col  h-[280px] overflow-auto   md:h-[380px]">
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
    </div>
  );
};

export default Conversations;

const Conversation = () => {
  return (
    <div className="">
      <div className="flex items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer gap-2">
        <div className="avatar online">
          <div className="w-12 rounded-full">
            <img
              src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              alt="user avatar"
            />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex  justify-between pr-4">
            <p className="font-bold text-gray-200 ">John Doe</p>
            <span className="text-xl ">🎃</span>
          </div>
        </div>
      </div>

    </div>
  );
};
