import { BiLogOut } from "react-icons/bi";
import useLogout from "../hooks/useLogout";


const LogoutButton = () => {
  const { loading, Logout } = useLogout();
  return (
    <div className="mt-auto">
      {loading ? (
        <span className="loading loading-spinner"></span>
      ) : (
        <BiLogOut
          className="w-6 h-6 text-white cursor-pointer"
          onClick={Logout}
        />
      )}
    </div>
  );
};

export default LogoutButton;
