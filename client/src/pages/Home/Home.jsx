import { useEffect, useState } from 'react';
import './home.scss'
import apiRequest from '../../lib/apiRequest';
import CardSlider from '../../components/CardSlider/CardSlider';
import SearchBar from '../../components/SearchBar/SearchBar';
import useError from '../../hooks/useError';
import Spinner from '../../components/Spinner/Spinner';
import {motion} from 'framer-motion';

const Home = () => {

    const [recentCars, setRecentCars] = useState([]);
    const { showError } = useError();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const recentFetchedCars = async () => {
            try {
                const response = await apiRequest.get('/posts/recent');
                setRecentCars(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch recent cars:', error);
                showError('Failed to fetch recent cars')
                setLoading(false);
            }

        }
        recentFetchedCars();
    }, []);
    console.log(recentCars);

    if(loading) return <Spinner />

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
        <div className='home'>
            <motion.div className="upperPart" variants={variant1} initial='initial' animate='animate'>
                <div className="textContainer">

                    <div className="wrapper">
                        <h1 className='title'>Find The Dream Car At The Most Affordable Price</h1>
                        <p>Your dream can be only a few clicks away!</p>
                    </div>

                </div>
                <div className="imgContainer">
                    <img src="/background.png" alt="" />
                </div>
            </motion.div>
            <motion.div className="lowerPart" >
                <motion.div variants={variant2} initial={{x:500}} animate='animate'>
                <SearchBar />
                </motion.div>
                <motion.div className="sliderContainer" variants={variant2} initial='initial' animate='animate'>
                    <CardSlider items={recentCars} />
                </motion.div>
            </motion.div>

        </div>
    )
}

export default Home;