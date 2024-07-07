import { useEffect, useState } from 'react';
import './singlePage.scss'
import apiRequest from '../../lib/apiRequest';
import { useParams } from 'react-router-dom';
import Slider from '../../components/Slider/Slider';

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
          <Slider images={post.images}/>
        </div>
      </div>
    </div>
  )
}

export default SinglePage