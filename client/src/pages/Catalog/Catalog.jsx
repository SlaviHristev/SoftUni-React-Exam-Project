import { useEffect, useState } from 'react'
import './catalog.scss'
import apiRequest from '../../lib/apiRequest';
import Card from '../../components/Card/Card';

const Catalog = () => {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const fetchedPosts = await apiRequest.get('/posts');
        setPosts(fetchedPosts.data);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    }
    getPosts();
  }, [])

  return (
    <div className='catalog'>
      <div className="container">
        <h2>Choose a car of your liking!</h2>
        <div className="wrapper">
          {posts.map(post => (
            <Card key={post._id} item={post} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Catalog