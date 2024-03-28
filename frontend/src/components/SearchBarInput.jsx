import { IoSearchSharp } from "react-icons/io5";
const SearchBarInput = () => {
  return (
    <form action="" className="flex items-center gap-2 ">
      <input type="text" placeholder="search" className="input input-bordered rounded-full" />
      <button className="btn btn-circle bg-sky-500 text-white" type="submit"><IoSearchSharp className="w-6 h-6 outline-none" /></button>
    </form>
  );
};

export default SearchBarInput;
