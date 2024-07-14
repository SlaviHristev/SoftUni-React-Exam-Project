import { useContext, useEffect, useState } from 'react';
import './singlePage.scss'
import apiRequest from '../../lib/apiRequest';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Slider from '../../components/Slider/Slider';
import DOMPurify from 'dompurify'
import { AuthContext } from '../../context/AuthContext';

const SinglePage = () => {
  const { currentUser, updateUser } = useContext(AuthContext);
  const [isSaved, setIsSaved] = useState(false);
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getPost = async () => {
      try {
        setLoading(true);
        const response = await apiRequest.get(`/posts/${id}`);
        setPost(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch post:', error);
        setError('Failed to fetch post');
        setLoading(false);
      }
    };
    getPost();
  }, [id]);

  useEffect(() => {
    if (currentUser && post) {
      setIsSaved(currentUser.savedPosts.some(savedPost => savedPost._id === post._id));
    }
  }, [currentUser, post]);

  const handleSavePost = async () => {
    try {
      const res = await apiRequest.post(`/users/save/${id}`, { userId: currentUser._id });
      const updatedSavedPosts = isSaved
        ? currentUser.savedPosts.filter(post => post._id !== id)
        : [...currentUser.savedPosts, post];

      updateUser(prevUser => ({
        ...prevUser,
        savedPosts: updatedSavedPosts
      }));
      setIsSaved(!isSaved);
    } catch (error) {
      console.log('Failed to toggle save post:', error);
    }
  };

  const deletePost = async () => {
    try {
      await apiRequest.delete(`/posts/${id}`);
      navigate('/catalog');
    } catch (error) {
      console.error('Failed to delete post:', error);
      setError('Failed to delete post');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!post) return <div>No post data</div>;

  const isOwner = currentUser?._id === post.ownerId._id;

  return (
    <div className='singlePage'>
      <div className="details">
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
              <div className="user">
                <img src={post.ownerId.avatar || '/noavatar.jpg'} alt="" />
                <span>{post.ownerId.username}</span>
              </div>
            </div>
            <div className="bottom" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.description) }}>
              { }
            </div>
          </div>
        </div>
      </div>
      <div className="features">
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
                <button>
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
      </div>
    </div>
  )
}

export default SinglePage