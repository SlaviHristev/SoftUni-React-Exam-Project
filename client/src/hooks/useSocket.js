import { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';

const SOCKET_SERVER_URL = 'http://localhost:8900';

const useSocket = (userId) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [notifications, setNotifications] = useState([]); 
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
      setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages, message];
          console.log("Updated Messages:", updatedMessages);
          return updatedMessages;
      });
  });

    
    newSocket.on("receiveNotification", (notification) => {
      setNotifications((prevNotifications) => [...prevNotifications, notification]);
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
        receiverId,
        text,
      });
    }
  };

 
  const sendNotification = (receiverId, message) => {
    if (socket) {
      socket.emit("sendNotification", {
        senderId: userId,
        receiverId,
        message,
      });
    }
  };

  return { 
    socket, 
    onlineUsers, 
    messages, 
    setMessages, 
    sendMessage,
    notifications, 
    sendNotification,
  };
};

export default useSocket;
