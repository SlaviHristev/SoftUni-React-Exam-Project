import { useEffect, useState } from 'react';
import './singlePage.scss'
import apiRequest from '../../lib/apiRequest';
import { useParams } from 'react-router-dom';
import Slider from '../../components/Slider/Slider';
import DOMPurify from 'dompurify'

const SinglePage = () => {

  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!post) return <div>No post data</div>;

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
              {/* <div className="user">TODO</div> */}
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
            <button>
              <img src="/chat.png" alt="" />
              Send a Message
            </button>
            <button>
              <img src="/save.png" alt="" />Save Post
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SinglePage