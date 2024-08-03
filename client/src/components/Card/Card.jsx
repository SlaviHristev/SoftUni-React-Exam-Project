import { Link } from 'react-router-dom'
import './card.scss'
import { useContext} from 'react'
import { AuthContext } from '../../context/AuthContext'
import Chat from '../Chat/Chat'
import Modal from '../Modal/Modal'
import useSavePost from '../../hooks/useSavePost'
import useOpenChat from '../../hooks/useOpenChat'


const Card = ({ item }) => {
    const {currentUser} = useContext(AuthContext);
    const { isSaved, handleSavePost } = useSavePost(currentUser, item);
    const { isChatOpen, chatReceiver, chatId, openChat, setIsChatOpen } = useOpenChat(currentUser);
    const isOwner = currentUser?._id === item.ownerId;


    return (
        <div className='card'>
            <Link to={`/catalog/${item._id}`} className='imageContainer'>
                <img src={item.images[0]} />
            </Link>
            <div className="textContainer">
                <h2 className='title'>
                    <Link to={`/catalog/${item._id}`}>{item.title}</Link>
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
                    {!isOwner && currentUser && (
                        <div className="icons">
                            <div className="icon" style={{ backgroundColor: isSaved ? "orange" : "inherit" }} onClick={handleSavePost}>
                                <img src='/save.png'   alt="Save"  />
                            </div>
                            <div className="icon"  onClick={() => openChat(item.ownerId)}>
                                <img src="/chat.png" alt="Chat" />
                            </div>
                        </div>
                    )}
                </div>


            </div>
                {isChatOpen && (
                    <Modal onClose={() => setIsChatOpen(false)}>
                        <Chat receiver={chatReceiver} setIsChatOpen={setIsChatOpen} chatId={chatId} currentUser={currentUser}/>
                    </Modal>
                )}
        </div>
    )
}

export default Card