import { useEffect, useRef, useContext } from 'react';
import { io } from 'socket.io-client';
import { AuthContext } from '../context/AuthContext';

const useSocket = () => {
  const { currentUser } = useContext(AuthContext);
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io("http://localhost:4000", {
      withCredentials: true,
    });

    if (currentUser) {
      socket.current.emit('newUser', currentUser._id);
    }

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [currentUser]);

  return socket;
};

export default useSocket;