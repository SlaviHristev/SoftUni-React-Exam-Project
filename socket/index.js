const io = require("socket.io")(8900, {
    cors: {
      origin: "http://localhost:5173",
    },
  });
  
  let users = [];
  
  const addUser = (userId, socketId) => {
    console.log("Adding user:", userId, socketId);
    !users.some((user) => String(user.userId) === String(userId)) &&
      users.push({ userId, socketId });
  };
  
  const removeUser = (socketId) => {
    users = users.filter((user) => String(user.socketId) !== String(socketId));
  };
  
  const getUser = (userId) => {
    return users.find((user) => String(user.userId) === String(userId));
  };
  
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
  
    socket.on("addUser", (userId) => {
      console.log("User connected:", userId);
      addUser(userId, socket.id);
      io.emit("getUsers", users);
    });
  
    socket.on("sendMessage", ({ senderId, recieverId, text }) => {
      const user = getUser(recieverId);
      console.log("Message from", senderId, "to", recieverId, ":", text);
      if (user) {
        const { socketId } = user;
        if (socketId) {
          const message = {
            senderId,
            text,
            createdAt: new Date().toISOString(), 
          };
          io.to(socketId).emit("getMessage", message);
          io.emit("newMessage", message);
        } else {
          console.error(`Socket ID not found for user: ${recieverId}`);
        }
      } else {
        console.error(`User not found: ${recieverId}`);
      }
    });

    socket.on("sendNotification", ({ senderId, receiverId, notificationData }) => {
      const user = getUser(receiverId);
      console.log("Notification from", senderId, "to", receiverId, ":", notificationData);
      if (user) {
          const { socketId } = user;
          if (socketId) {
              io.to(socketId).emit("getNotification", {
                  senderId,
                  ...notificationData,
                  createdAt: new Date().toISOString(),
              });
          } else {
              console.error(`Socket ID not found for user: ${receiverId}`);
          }
      } else {
          console.error(`User not found: ${receiverId}`);
      }
  });

  
    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });
  
  console.log("Socket.IO server running on port 8900");
  