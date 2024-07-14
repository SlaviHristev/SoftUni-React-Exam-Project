import { useEffect, useState } from "react";
import './chat.scss'
import apiRequest from "../../lib/apiRequest";

const Chat = ({
    receiver,
    setIsChatOpen,
    chatId,
    currentUser
}) => {
    
    const [messages,setMessages] = useState([]);
    const [newMessage,setNewMessage] = useState('');

    useEffect(() =>{

        const fetchChatHistory = async() =>{
            try {
                const res = await apiRequest.get(`/chats/${chatId}`);
                setMessages(res.data.messages);
            } catch (error) {
                console.log('Failed to fetch chat history:', error);
            }
        }
       fetchChatHistory(); 
    },[chatId])
    return (
      <div className='chat'>
        <div className="chatBox">
          <div className="top">
            <div className="user">
              <img src={receiver.avatar || '/noavatar.jpg'} alt="" />
              <span>{receiver.username}</span>
            </div>
            <span className='close' onClick={() => setIsChatOpen(false)}>X</span>
          </div>
          <div className="center">
            <div className="chatMessage" style={{ alignSelf: "flex-end", textAlign: "right" }}>
              <p>Message text...</p>
              <span>Timestamp</span>
            </div>
            <div className="chatMessage" style={{ alignSelf: "flex-start", textAlign: "left" }}>
              <p>Message text...</p>
              <span>Timestamp</span>
            </div>
            <div className="chatMessage" style={{ alignSelf: "flex-end", textAlign: "right" }}>
              <p>Message text...</p>
              <span>Timestamp</span>
            </div>
            <div></div>
          </div>
          <form className="bottom">
            <textarea name='text'></textarea>
            <button type='submit'>Send</button>
          </form>
        </div>
      </div>
    );
  }
  
  export default Chat;