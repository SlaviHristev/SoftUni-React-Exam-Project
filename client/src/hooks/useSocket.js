import { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';

const SOCKET_SERVER_URL = 'http://localhost:8900';

const useSocket = (userId) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socketRef = useRef();

  useEffect(() => {

    const newSocket = io(SOCKET_SERVER_URL, {
      transports: ['websocket'],
      cors: {
        origin: "http://localhost:5173",
      }
    });

    newSocket.emit("addUser", userId);

    newSocket.on("getUsers", (users) => {
      setOnlineUsers(users);
    });

    newSocket.on("getMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socketRef.current = newSocket;
    setSocket(newSocket);


    return () => {
      newSocket.disconnect();
    };
  }, [userId]);

  const sendMessage = (receiverId, text) => {
    if (socket) {
      socket.emit("sendMessage", {
        senderId: userId,
        recieverId: receiverId,
        text,
      });
    }
  };

  return { socket, onlineUsers, messages, setMessages, sendMessage };
};

export default useSocket;
