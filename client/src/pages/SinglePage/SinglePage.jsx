import { useEffect, useState } from 'react';
import './singlePage.scss'
import apiRequest from '../../lib/apiRequest';
import { useParams } from 'react-router-dom';

const SinglePage = () => {

    const [post, setPost] = useState('');
    const {id} = useParams();

    useEffect(() => {
      const getPost = async () => {
        try {
          const response = await apiRequest.get(`/posts/${id}`);
          setPost(response.data);
        } catch (error) {
          console.error('Failed to fetch posts:', error);
        }
      }
      getPost();
      console.log(post);
    }, [id]);

  return (
    <div className='singlePage'>
        <div className="details">
          <div className="wrapper">
            
          </div>
        </div>
    </div>
  )
}

export default SinglePage