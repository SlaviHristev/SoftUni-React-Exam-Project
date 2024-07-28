import { useContext, useEffect, useState } from 'react';
import './singlePage.scss'
import apiRequest from '../../lib/apiRequest';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Slider from '../../components/Slider/Slider';
import DOMPurify from 'dompurify'
import { AuthContext } from '../../context/AuthContext';
import Modal from '../../components/Modal/Modal';
import Chat from '../../components/Chat/Chat';
import useError from '../../hooks/useError';
import Spinner from '../../components/Spinner/Spinner';
import { motion } from 'framer-motion';
import useOpenChat from '../../hooks/useOpenChat';
import useSavePost from '../../hooks/useSavePost';

const SinglePage = () => {
  const { currentUser } = useContext(AuthContext);
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { showError } = useError();
  const { isChatOpen, chatReceiver, chatId, openChat, setIsChatOpen } = useOpenChat(currentUser);
   const { isSaved, handleSavePost } = useSavePost(currentUser, post);

  useEffect(() => {
    const getPost = async () => {
      try {
        setLoading(true);
        const response = await apiRequest.get(`/posts/${id}`);
        setPost(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch post:', error);
        showError('Failed to fetch post')
        setLoading(false);
      }
    };
    getPost();
  }, [id]);
  

  const deletePost = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');

    if (!confirmDelete) return;
    try {
      await apiRequest.delete(`/posts/${id}`);
      navigate('/catalog');
    } catch (error) {
      console.error('Failed to delete post:', error);
      showError('Failed to delete post')
    }
  };

  if (loading) return <Spinner />;
  if (!post) return <div>No post data</div>;

  const variants = {
    initial: {
      y: 0,
      opacity: 0
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.1,
      },
    }
  };

  const isOwner = currentUser?._id === post.ownerId?._id;

  return (
    <div className='singlePage'>
      <motion.div className="details" variants={variants} initial='initial' whileInView='animate'>
        <div className="wrapper">
          <Slider images={post.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="city">
                  <img src="/pin.png" alt="" />
                  <p>City:</p>
                  <span>{post.city}</span>
                </div>
                <div className="price">
                  <p>Price:</p>
                  $ {post.price}</div>
              </div>
              <Link to={`/profiles/${post.ownerId._id}`} >
                <div className="user">
                  <img src={post.ownerId.avatar || '/noavatar.jpg'} alt="" />
                  <span>{post.ownerId.username}</span>
                </div>
              </Link>
            </div>
            <div className="bottom" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.description) }}>
              { }
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div className="features" variants={variants} initial='initial' whileInView='animate'>
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/calendar.png" alt="" />
              <div className="featurText">
                <span>Year</span>
                <p>{post.yearOfMake}</p>
              </div>
            </div>
            <div className="feature">
              <img src="/engine.png" alt="" />
              <div className="featureText">
                <span>Engine</span>
                <p>{post.fuelType}</p>
              </div>
            </div>
            <div className="feature">
              <img src="/horsePower.png" alt="" />
              <div className="featureText">
                <span>Horse Power</span>
                <p>{post.horsePower}</p>
              </div>
            </div>
            <div className="feature">
              <img src="/category.png" alt="" />
              <div className="featureText">
                <span>Category</span>
                <p>{post.category}</p>
              </div>
            </div>
            <div className="feature">
              <img src="/transmission.png" alt="" />
              <div className="featureText">
                <span>Transmission</span>
                <p>{post.transmission}</p>
              </div>
            </div>
            <div className="feature">
              <img src="/color.png" alt="" />
              <div className="featureText">
                <span>Color</span>
                <p>{post.color}</p>
              </div>
            </div>
          </div>
          <div className="buttons">
            {isOwner &&
              <>
                <Link to={`/edit/${post._id}`}>
                  <button>
                    <img src="/edit.png" alt="" />
                    Edit
                  </button>
                </Link>
                <button onClick={deletePost}>
                  <img src="/delete.png" alt="" />
                  Delete
                </button>
              </>
            }
            {!isOwner && currentUser &&
              <>
                <button onClick={() => openChat(post.ownerId._id)}>
                  <img src="/chat.png" alt="" />
                  Send a Message
                </button>
                <button onClick={handleSavePost} style={{ backgroundColor: isSaved ? "orange" : "inherit" }}>
                  <img src="/save.png" alt="" />{isSaved ? 'Unsave Post' : 'Save Post'}
                </button>
              </>
            }
          </div>
        </div>
      </motion.div>
      {isChatOpen && (
        <Modal onClose={() => setIsChatOpen(false)}>
          <Chat receiver={chatReceiver} setIsChatOpen={setIsChatOpen} chatId={chatId} currentUser={currentUser} />
        </Modal>
      )}
    </div>
  )
}

export default SinglePage