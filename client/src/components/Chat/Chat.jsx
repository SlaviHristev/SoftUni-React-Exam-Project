import { useEffect, useRef, useState } from "react";
import useSocket from "../../hooks/useSocket";
import './chat.scss'
import apiRequest from "../../lib/apiRequest";
import useError from "../../hooks/useError";

const Chat = ({
    receiver,
    setIsChatOpen,
    chatId,
    currentUser
}) => {

    const { showError } = useError();
    const { socket, messages, sendMessage } = useSocket(currentUser._id);
    const [newMessage, setNewMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const messageEndRef = useRef(null);

    useEffect(() => {
        const fetchChatHistory = async () => {
            try {
                const res = await apiRequest.get(`/chats/${chatId}`);
                setChatMessages(res.data.messages);
            } catch (error) {
                console.log('Failed to fetch chat history:', error);
                showError('Failed to fetch chat history');
            }
        }
        fetchChatHistory();
    }, [chatId]);

    useEffect(() => {
        if (messages.length > 0) {
            const latestMessage = messages[messages.length - 1];
            setChatMessages(prevMessages => [...prevMessages, latestMessage]);
        }
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();

        try {
            const res = await apiRequest.post('/messages/send', {
                chatId,
                senderId: currentUser._id,
                text: newMessage
            });

            sendMessage(receiver._id, newMessage);
            setChatMessages([...chatMessages, res.data]);
            setNewMessage('');
        } catch (error) {
            console.log('Failed to send messages:', error);
            showError('Failed to send message');
        }
    }
    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatMessages])

    const getSenderId = (message) => {
        return typeof message.senderId === 'object' ? message.senderId._id : message.senderId;
    };

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
                    {chatMessages.map(message => (
                        <div className="chatMessage" key={message._id}
                            style={{
                                alignSelf: getSenderId(message) === String(currentUser._id) ? 'flex-end' : 'flex-start',
                                textAlign: getSenderId(message) === String(currentUser._id) ? "right" : "left"

                            }}
                        >
                            <p>{message.text}</p>
                            <span>{new Date(message.createdAt).toLocaleTimeString()}</span>
                        </div>

                    ))}
                    <div ref={messageEndRef} />
                </div>
                <form className="bottom" onSubmit={handleSendMessage}>
                    <textarea name='text' value={newMessage} onChange={(e) => setNewMessage(e.target.value)}></textarea>
                    <button type='submit'>Send</button>
                </form>
            </div>
        </div>
    );
}

export default Chat;
