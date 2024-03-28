import axios from "axios";
import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

//hook to log out user and it removes authUser object from local storage
const useLogout = () => {
    const {setAuthUser} = useAuthContext();
  const [loading, setLoading] = useState(false);
  const Logout = async() => {
    try {
        setLoading(true);
        const res = await axios.post("/api/auth/logout", {
            headers: {
                "Content-Type": "application/json",
            },
        });
        if(res.error){
            throw new Error(res.error);
        }
        localStorage.removeItem("authUser");
        setAuthUser(null);
    } catch (error) {
        console.log("error from logout hook",error);
        toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
    return { loading, Logout };
};

export default useLogout;
