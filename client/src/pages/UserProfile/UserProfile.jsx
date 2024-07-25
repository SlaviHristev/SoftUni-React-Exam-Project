import { useNavigate, useParams } from 'react-router-dom';
import './userProfile.scss'
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import apiRequest from '../../lib/apiRequest';
import Card from '../../components/Card/Card';
import useError from '../../hooks/useError';
import Spinner from '../../components/Spinner/Spinner';

const UserProfile = () => {
    const {id} = useParams();
    const {currentUser} = useContext(AuthContext);
    const [profile, SetProfile] = useState(null);
    const [posts,SetPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const { showError } = useError();

    useEffect(() =>{

        const fetchProfileInfo = async() =>{
            try {
                setLoading(true);
                const profileRes = await apiRequest.get(`/users/profiles/${id}`);
                const postRes = await apiRequest.get(`/posts/user/${id}`);
                SetProfile(profileRes.data);
                SetPosts(postRes.data);
                setLoading(false)
            } catch (error) {
                console.log(error);
                showError('Failed to fetch User info')
                setLoading(false);
            }
        }

        fetchProfileInfo();

    },[id]);

    if (loading) return <Spinner />;
  return (
    <div className='userProfile'>
        <div className="userInfo">
            <img src={profile.avatar || '/noavatar.jpg'} alt="" />
            <h2>{profile.username}</h2>
            <p>{profile.email}</p>
            {
                currentUser && (
                    <button>Message</button>
                )
            }
        </div>
        <div className="profilePosts">
            <h3>Posts</h3>
            {
                posts.length > 0 ? (
                    posts.map(post =>(
                        <Card key={post._id} item={post} />
                    ))
                ): (
                    <p>No posts available</p>
                )
            }
            
        </div>
    </div>
  )
}

export default UserProfile;