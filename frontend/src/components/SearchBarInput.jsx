import { useState } from "react";
import toast from "react-hot-toast";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../zustand/useConversation";
import useGetUserConversations from "../hooks/useGetUserConversation";
const SearchBarInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetUserConversations();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    if (search.trim().length < 3)
      return toast.error("Search query must be atleast 3 characters long");
    const conversation = conversations.find((conversation) =>
      conversation.fullName.toLowerCase().includes(search.toLowerCase())
    );
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("No user found with that name");
    }
  };
  return (
    <form
      action=""
      className="flex items-center gap-2 "
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="search"
        className="input input-bordered rounded-full"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        value={search}
      />
      <button className="btn btn-circle bg-sky-500 text-white" type="submit">
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};

export default SearchBarInput;
