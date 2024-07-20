import { useEffect, useState } from 'react';
import './home.scss'
import apiRequest from '../../lib/apiRequest';
import CardSlider from '../../components/CardSlider/CardSlider';
import Card from '../../components/Card/Card';
import SearchBar from '../../components/SearchBar/SearchBar';

const Home = () => {

    const [recentCars, setRecentCars] = useState([]);

    useEffect(() => {
        const recentFetchedCars = async () => {
            try {
                const response = await apiRequest.get('/posts/recent');
                setRecentCars(response.data);
            } catch (error) {
                console.error('Failed to fetch recent cars:', error);

            }

        }
        recentFetchedCars();
    }, []);
    console.log(recentCars);

    return (
        <div className='home'>
            <div className="upperPart">
                <div className="textContainer">

                    <div className="wrapper">
                        <h1 className='title'>Find The Dream Car At The Most Affordable Price</h1>
                        <p>Your dream can be only a few clicks away!</p>
                    </div>

                </div>
                <div className="imgContainer">
                    <img src="/background.png" alt="" />
                </div>
            </div>
            <div className="lowerPart">
                <SearchBar />
                <div className="sliderContainer">
                    <CardSlider items={recentCars} />
                </div>
            </div>

        </div>
    )
}

export default Home;