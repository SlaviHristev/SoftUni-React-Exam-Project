import { Link } from 'react-router-dom'
import './card.scss'

const Card = ({ item }) => {
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
                    <div className="icons">
                        <div className="icon">
                            <img src="/save.png" alt="" />
                        </div>
                        <div className="icon">
                            <img src="/chat.png" alt="" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Card