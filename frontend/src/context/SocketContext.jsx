import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";
import PropTypes from "prop-types";

export const SocketContext = createContext();

export const useSocketContext =()=>{
  return useContext(SocketContext);
}

// eslint-disable-next-line react/prop-types
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineusers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      const socket = io("https://chatkar.onrender.com", {
        query: {
          userId: authUser._id,
        },
      }); //backend url
      setSocket(socket);

      socket.on("getOnlineUsers",(users)=>{
        setOnlineUsers(users);
      })

      return () => {
        socket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineusers }}>
      {children}
    </SocketContext.Provider>
  );
};
SocketProvider.propTypes = {
  children: PropTypes.node.isRequired, // Ensures children is a React node and is required
};
