import { useEffect, useState } from 'react'
import './catalog.scss'
import apiRequest from '../../lib/apiRequest';
import Card from '../../components/Card/Card';
import SearchBar from '../../components/SearchBar/SearchBar';
import { useLocation } from 'react-router-dom';

const Catalog = () => {
  const [posts, setPosts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const query = new URLSearchParams(location.search);
      const fuelType = query.get('fuelType');
      const category = query.get('category');
      const city = query.get('city');
      const minPrice = query.get('minPrice');
      const maxPrice = query.get('maxPrice');

      try {
        let fetchedPosts;
        if (fuelType || category || city || minPrice || maxPrice) {
          fetchedPosts = await apiRequest.get('/posts/search', {
            params: {
              fuelType,
              category,
              city,
              minPrice,
              maxPrice
            }
          });
        } else {
          fetchedPosts = await apiRequest.get('/posts');
        }
        setPosts(fetchedPosts.data);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };
    fetchPosts();
  }, [location.search]);

  return (
    <div className='catalog'>
      <div className="container">
        <h2>Choose a car of your liking!</h2>
        <SearchBar />
        <div className="wrapper">
          {posts.length > 0 ? (
            posts.map(post => (
              <Card key={post._id} item={post} />
            ))
          ) : (
            <p>No posts found!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalog;