import { useEffect, useState } from 'react'
import './catalog.scss'
import apiRequest from '../../lib/apiRequest';
import Card from '../../components/Card/Card';
import SearchBar from '../../components/SearchBar/SearchBar';
import { useLocation } from 'react-router-dom';
import useError from '../../hooks/useError';
import Spinner from '../../components/Spinner/Spinner';
import { motion } from 'framer-motion'

const Catalog = () => {
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  const { showError } = useError();
  const [loading, setLoading] = useState(true);

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
          setLoading(false);
        } else {
          fetchedPosts = await apiRequest.get('/posts');
        }
        setPosts(fetchedPosts.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
        showError('Failed to fetch posts');
        setLoading(false);
      }
    };
    fetchPosts();
  }, [location.search]);


  if (loading) return <Spinner />

  const variant1 = {
    initial: {
      y: 500,
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
      x: -500,
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className='catalog'>
      <div className="container" >
        <motion.h2 variants={variant2} initial='initial' animate='animate'>Choose a car of your liking!</motion.h2 >
        <motion.div variants={variant2} initial='initial' animate='animate'>
          <SearchBar />
        </motion.div>
        <motion.div className="wrapper">
          {posts.length > 0 ? (
            posts.map(post => (
              <motion.div variants={variant1} initial='initial' animate='animate' key={post._id}>
                <Card  item={post} />
              </motion.div>
            ))
          ) : (
            <p>No posts found!</p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Catalog;