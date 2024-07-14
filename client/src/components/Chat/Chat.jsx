import { useState } from "react";
import './chat.scss'

const Chat = () => {
    

    return (
      <div className='chat'>
        <div className="messages">
          <h1>Messages</h1>
          <div className="message">
            <img src='/noavatar.jpg' alt="" />
            <span>Username</span>
            <p>Last message preview...</p>
          </div>
          <div className="message">
            <img src='/noavatar.jpg' alt="" />
            <span>Username</span>
            <p>Last message preview...</p>
          </div>
          <div className="message">
            <img src='/noavatar.jpg' alt="" />
            <span>Username</span>
            <p>Last message preview...</p>
          </div>
        </div>
        <div className="chatBox">
          <div className="top">
            <div className="user">
              <img src='/noavatar.jpg' alt="" />
              <span>Username</span>
            </div>
            <span className='close'>X</span>
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