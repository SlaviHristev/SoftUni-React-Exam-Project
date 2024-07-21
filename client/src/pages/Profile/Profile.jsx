import { useContext, useEffect, useState } from 'react';
import './profile.scss'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import apiRequest from '../../lib/apiRequest';
import Card from '../../components/Card/Card';
import Modal from '../../components/Modal/Modal';
import Chat from '../../components/Chat/Chat';
import useError from '../../hooks/useError';
import Spinner from '../../components/Spinner/Spinner';

const Profile = () => {
    const { currentUser } = useContext(AuthContext);
    const [userPosts, setUserPosts] = useState([]);
    const [savedPosts, setSavedPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [chats, setChats] = useState([]);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [chatReceiver, setChatReceiver] = useState(null);
    const [chatId, setChatId] = useState(null);
    const { showError } = useError();

    useEffect(() => {
        const fetchUserPosts = async () => {
            if (!currentUser) {
                console.log("Current user is not available");
                return;
            }

            console.log("Fetching posts for user:", currentUser._id);
            try {
                const res = await apiRequest.get(`/posts/user/${currentUser._id}`);
                console.log("API response:", res.data);
                setUserPosts(res.data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch user posts:', error);
                showError('Failed to fetch user posts');
                setLoading(false);
            }
        };

        const fetchSavedPosts = async () => {
            if (!currentUser) {
                console.log("Current user is not available");
                return;
            }
            console.log("Fetching saved posts for user:", currentUser._id);

            try {
                const res = await apiRequest.get(`/users/${currentUser._id}/saved`)
                console.log("API response:", res.data);
                setSavedPosts(res.data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch saved posts:', error);
                showError('Failed to fetch saved posts')
                setLoading(false);
            }
        }

        const fetchUserChats = async () => {
            if (!currentUser) return;
            try {
                const res = await apiRequest.get(`/chats/user/${currentUser._id}`);
                setChats(res.data.filter(chat => chat.messages.length > 0));
                setLoading(false);
            } catch (error) {
                console.log('Failed to fetch user chats:', error)
                showError('Failed to fetch user chats')
                setLoading(false);
            }
        }

        fetchUserPosts();
        fetchSavedPosts()
        fetchUserChats();
    }, [currentUser]);

    const handleOpenChat = async (chatId, receiver) => {
        setChatReceiver(receiver);
        setChatId(chatId);
        setIsChatOpen(true);
    };

    if(loading) return <Spinner/>

    return (
        <div className='profile'>
            <div className="details">
                <div className="wrapper">
                    <div className="title">
                        <h1>User Information</h1>
                        <Link to='/profile/update'>
                            <button>Update Profile</button>
                        </Link>
                    </div>
                    <div className="info">
                        <span>Avatar: <img src={currentUser.avatar || '/noavatar.jpg'} alt='' /></span>
                        <span>Username: {currentUser.username}</span>
                        <span>Email: {currentUser.email}</span>
                    </div>
                    <div className="title">
                        <h1>My Posts</h1>
                        <Link to='/create'>
                            <button>Create New Post</button>
                        </Link>
                        <div className="posts">
                            {
                                userPosts.length > 0 ? (
                                    userPosts.map(post => (
                                        <div className="post" key={post.id}>
                                            <Card item={post} />
                                        </div>
                                    ))
                                ) : (
                                    <p>No Posts Created Yet!</p>
                                )
                            }
                        </div>
                    </div>
                    <div className="title">
                        <h1>Saved Posts</h1>
                        <div className="posts">
                            {savedPosts.length > 0 ? (
                                savedPosts.map(post => (
                                    <div className="post" key={post._id}>
                                        <Card item={post} />
                                    </div>
                                ))
                            ) : (
                                <p>No Saved Posts!</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
            <div className="messages">
                <h1>Messages</h1>
                {
                    chats.length > 0 ? (
                        chats.map((chat) => {
                            const otherUser = chat.userIds.find(user => user._id !== currentUser._id);
                            const lastMessage = chat.messages[chat.messages.length - 1];
                            return (
                                <div
                                    className="message"
                                    key={chat._id}
                                    onClick={() => handleOpenChat(chat._id, otherUser)}
                                >
                                    <img src={otherUser.avatar || '/noavatar.jpg'} alt="" />
                                    <span>{otherUser.username}</span>
                                    <p>{lastMessage?.text}</p>
                                </div>
                            );
                        })
                    ) : (
                        <p>No Messages!</p>
                    )
                }
                </div>
            </div>
            {isChatOpen && chatReceiver && chatId && (
                <Modal onClose={() => setIsChatOpen(false)}>
                    <Chat receiver={chatReceiver} setIsChatOpen={setIsChatOpen} chatId={chatId} currentUser={currentUser} />
                </Modal>
            )}
        </div>
    )
}

export default Profile