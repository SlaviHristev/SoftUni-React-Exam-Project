import { useEffect, useState } from "react";
import './chat.scss';
import apiRequest from "../../lib/apiRequest";
import useError from "../../hooks/useError";
import useSocket from "../../hooks/useSocket";

const Chat = ({ receiver, setIsChatOpen, chatId, currentUser }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const { showError } = useError();
    const socket = useSocket();

    useEffect(() => {
        const fetchChatHistory = async () => {
            try {
                const res = await apiRequest.get(`/chats/${chatId}`);
                setMessages(res.data.messages);
            } catch (error) {
                console.log('Failed to fetch chat history:', error);
                showError('Failed to fetch chat history');
            }
        }
        fetchChatHistory();
    }, [chatId, showError]);

    useEffect(() => {
        if (socket.current) {
            // Listen for incoming messages
            socket.current.on('getMessage', (data) => {
                setMessages((prevMessages) => [...prevMessages, data]);
            });

            // Cleanup listener on component unmount
            return () => {
                socket.current.off('getMessage');
            };
        }
    }, [socket]);

    const handleSendMessage = async (e) => {
        e.preventDefault();

        try {
            const res = await apiRequest.post('/messages/send', {
                chatId,
                senderId: currentUser._id,
                text: newMessage
            });

            setMessages([...messages, res.data]);
            setNewMessage('');

            // Emit message to socket server
            if (socket.current) {
                socket.current.emit('sendMessage', {
                    receiverId: receiver._id,
                    data: res.data
                });
            }
        } catch (error) {
            console.log('Failed to send messages:', error);
            showError('Failed to send message');
        }
    }

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
                    {messages.map(message => (
                        <div
                            className="chatMessage"
                            key={message._id}
                            style={{
                                alignSelf: message.senderId._id === currentUser._id ? 'flex-end' : 'flex-start',
                                textAlign: message.senderId._id === currentUser._id ? "right" : "left"
                            }}
                        >
                            <p>{message.text}</p>
                            <span>{new Date(message.createdAt).toLocaleTimeString()}</span>
                        </div>
                    ))}
                </div>
                <form className="bottom" onSubmit={handleSendMessage}>
                    <textarea
                        name='text'
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    ></textarea>
                    <button type='submit'>Send</button>
                </form>
            </div>
        </div>
    );
}

export default Chat;