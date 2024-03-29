import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const useGetUserConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  //   console.log(conversations);

  useEffect(() => {
    const getUsersConvo = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/users");
        // console.log(response.data);
        // console.log("response",response);
        // if(!response.data.success){
        //     throw new Error(response.error);
        // }
        if (response.status !== 200) {
          throw new Error(response.error || response.data.Error);
        }
        // console.log("response", response.data);
        setConversations(response.data);
        // console.log("conversations from hook",conversations);
      } catch (error) {
        console.log("useGetUserConversations error ", error);
        toast.error(
          error.message ||
            error.Error ||
            error.error ||
            "Error getting conversations"
        );
      } finally {
        setLoading(false);
      }
    };
    getUsersConvo();
  }, []);
//   console.log("conversation", conversations);

  return { loading, conversations };
};

export default useGetUserConversations;
