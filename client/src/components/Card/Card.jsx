import { Link } from 'react-router-dom'
import './card.scss'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import apiRequest from '../../lib/apiRequest'

const Card = ({ item }) => {
    const {currentUser} = useContext(AuthContext);

    const isOwner = currentUser?._id === item.ownerId;

    const handleSavePost = async(id) =>{
        try {
            await apiRequest.post(`/users/save/${id}`, {userId: currentUser._id})
        } catch (error) {
            console.log('Failed to save post:', error);
        }
    }

    

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
                            <div className="icon">
                                <img src="/save.png" alt="Save" onClick={() => handleSavePost(item._id)} />
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