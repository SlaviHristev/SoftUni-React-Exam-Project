import { useParams } from 'react-router-dom';
import './userProfile.scss'
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import apiRequest from '../../lib/apiRequest';
import Card from '../../components/Card/Card';
import useError from '../../hooks/useError';
import Spinner from '../../components/Spinner/Spinner';
import Modal from '../../components/Modal/Modal';
import Chat from '../../components/Chat/Chat';
import {motion} from 'framer-motion';
import useOpenChat from '../../hooks/useOpenChat';

const UserProfile = () => {
    const { id } = useParams();
    const { currentUser } = useContext(AuthContext);
    const [profile, SetProfile] = useState(null);
    const [posts, SetPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { showError } = useError();
    const { isChatOpen, chatReceiver, chatId, openChat, setIsChatOpen } = useOpenChat(currentUser);

    useEffect(() => {

        const fetchProfileInfo = async () => {
            try {
                setLoading(true);
                const profileRes = await apiRequest.get(`/users/profiles/${id}`);
                const postRes = await apiRequest.get(`/posts/user/${id}`);
                SetProfile(profileRes.data);
                SetPosts(postRes.data);
                setLoading(false)
            } catch (error) {
                console.log(error);
                showError('Failed to fetch User info')
                setLoading(false);
            }
        }

        fetchProfileInfo();

    }, [id]);


    const variant1 = {
        initial: {
          y: -500,
          opacity: 0
        },
        animate: {
          y: 0,
          opacity: 1,
          transition: {
            duration: 1,
            staggerChildren: 0.3,
    
          },
        }
      };
      const variant2 = {
        initial: {
          y: 400,
          opacity: 0,
        },
        animate: {
          y: 0,
          opacity: 1,
          transition: {
            duration: 1,
            staggerChildren: 0.1,
          },
        },
      };

    if (loading) return <Spinner />;
    return (
        <div className='userProfile'>
            <motion.div className="userInfo" variants={variant1} initial='initial' animate='animate'>
                <img src={profile.avatar || '/noavatar.jpg'} alt="" />
                <h2>{profile.username}</h2>
                <p>{profile.email}</p>
                {
                    currentUser && (
                        <button onClick={() => openChat(profile._id)}>
                            <img src="/chat.png" alt="" />
                            Send a Message
                        </button>
                    )
                }
            </motion.div>
            <motion.div className="profilePosts"variants={variant2} initial='initial' animate='animate'>
                <h3>Posts</h3>
                {
                    posts.length > 0 ? (
                        posts.map(post => (
                            <Card key={post._id} item={post} />
                        ))
                    ) : (
                        <p>No posts available</p>
                    )
                }

            </motion.div>
            {isChatOpen && (
                <Modal onClose={() => setIsChatOpen(false)}>
                    <Chat receiver={chatReceiver} setIsChatOpen={setIsChatOpen} chatId={chatId} currentUser={currentUser} />
                </Modal>
            )}
        </div>
    )
}

export default UserProfile;