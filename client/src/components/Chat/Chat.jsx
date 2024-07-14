import { useState } from "react";
import './chat.scss'

const Chat = ({
    receiver,
    setIsChatOpen
}) => {
    

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