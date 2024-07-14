import { Link } from 'react-router-dom'
import './card.scss'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import apiRequest from '../../lib/apiRequest'

const Card = ({ item }) => {
    const {currentUser, updateUser} = useContext(AuthContext);
    const [isSaved, setIsSaved] = useState(false);

    const isOwner = currentUser?._id === item.ownerId;

    useEffect(() => {
        if (currentUser && currentUser.savedPosts) {
            setIsSaved(currentUser.savedPosts.some(savedPost => savedPost._id === item._id));
        }
    }, [currentUser, item._id]);
    

    const handleSavePost = async(id) =>{
        try {
            const res = await apiRequest.post(`/users/save/${id}`, { userId: currentUser._id });
            setIsSaved(!isSaved);
            
            if (isSaved) {
                updateUser(prevUser => ({
                    ...prevUser,
                    savedPosts: prevUser.savedPosts.filter(post => post._id !== id)
                }));
            } else {
                updateUser(prevUser => ({
                    ...prevUser,
                    savedPosts: [...prevUser.savedPosts, item]
                }));
            }
        } catch (error) {
            console.log('Failed to toggle save post:', error);
        }
    };

    

    return (
        <div className='card'>
            <Link to={`/${item._id}`} className='imageContainer'>
                <img src={item.images[0]} />
            </Link>
            <div className="textContainer">
                <h2 className='title'>
                    <Link to={`/${item._id}`}>{item.title}</Link>
                </h2>
                <p className='city'>
                    <img src="/pin.png" alt="" />
                    <span>{item.city}</span>
                </p>
                <p className='price'>$ {item.price}</p>
                <div className="bottom">

                    <div className="features">
                        <div className="feature">
                            <img src="/engine.png" alt="" />
                            <span>{item.fuelType}</span>
                        </div>
                        <div className="feature">
                            <img src="/calendar.png" alt="" />
                            <span>{item.yearOfMake}</span>
                        </div>
                    </div>
                    {!isOwner && (
                        <div className="icons">
                            <div className="icon" style={{ backgroundColor: isSaved ? "orange" : "inherit" }} onClick={() => handleSavePost(item._id)}>
                                <img src='/save.png'   alt="Save"  />
                            </div>
                            <div className="icon">
                                <img src="/chat.png" alt="Chat" />
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}

export default Card