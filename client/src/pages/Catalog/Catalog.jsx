import { useEffect, useState } from 'react'
import './catalog.scss'
import apiRequest from '../../lib/apiRequest';

const Catalog = () => {

  const [posts,setPosts] = useState([]);
  
  useEffect(() =>{
    const getPosts = async () => {
      try {
        const fetchedPosts = await apiRequest.get('/posts');
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    }
    getPosts();
  },[])

  return (
    <div className='catalog'>
        <div className="container">
            <h2>Choose a car of your liking!</h2>
            <div className="wrapper">
          {console.log(posts)}
            </div>
        </div>
    </div>
  )
}

export default Catalog