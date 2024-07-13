import { useContext, useEffect, useState } from 'react';
import './profile.scss'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import apiRequest from '../../lib/apiRequest';
import Card from '../../components/Card/Card';

const Profile = () => {
    const { currentUser } = useContext(AuthContext);
    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        const fetchUserPosts = async () => {
            if (!currentUser) {
                console.log("Current user is not available");
                return;
            }

            console.log("Fetching posts for user:", currentUser._id);
            try {
                const res = await apiRequest.get(`/posts/user/${currentUser._id}`);
                console.log("API response:", res.data);
                setUserPosts(res.data);
            } catch (error) {
                console.error('Failed to fetch user posts:', error);
            }
        };

        fetchUserPosts();
    }, [currentUser]);

    console.log("User posts:", userPosts);

    return (
        <div className='profile'>
            <div className="details">
                <div className="wrapper">
                    <div className="title">
                        <h1>User Information</h1>
                        <Link to='/profile/update'>
                            <button>Update Profile</button>
                        </Link>
                    </div>
                    <div className="info">
                        <span>Avatar: <img src={currentUser.avatar || '/noavatar.jpg'} alt='' /></span>
                        <span>Username: {currentUser.username}</span>
                        <span>Email: {currentUser.email}</span>
                    </div>
                    <div className="title">
                        <h1>My Posts</h1>
                        <Link to='/create'>
                            <button>Create New Post</button>
                        </Link>
                        <div className="posts">
                        {
                        userPosts.length > 0 ? (
                            userPosts.map(post => (
                                <div className="post" key={post.id}>
                                    <Card item={post} />
                                </div>
                            ))
                        ) : (
                            <p>No Posts Created Yet!</p>
                        )
                    }
                        </div>
                    </div>
                    <div className="title">
                        <h1>Saved Posts</h1>
                    </div>
                </div>
            </div>
            <div className="container">

            </div>
        </div>
    )
}

export default Profile