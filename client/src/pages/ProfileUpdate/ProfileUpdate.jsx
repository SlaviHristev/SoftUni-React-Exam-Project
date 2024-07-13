import { useContext, useState } from 'react';
import UploadWidget from '../../components/UploadWidget/UploadWidget';
import './profileUpdate.scss'
import { AuthContext } from '../../context/AuthContext';
import apiRequest from '../../lib/apiRequest';
import { useNavigate } from 'react-router-dom';

const ProfileUpdate = () => {
    const { currentUser, updateUser } = useContext(AuthContext);
    const [avatar, setAvatar] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const { username, email, password } = Object.fromEntries(formData);

        try {
            const res = await apiRequest.put(`/users/${currentUser._id}`,
                {
                    username,
                    email,
                    password,
                    avatar: avatar[0]
                });
            updateUser(res.data);
            navigate('/profile');
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='profileUpdate'>
            <div className="formContainer">
                <form onSubmit={handleSubmit}>
                    <h1>Update Profile</h1>
                    <div className="item">
                        <label htmlFor="username">Username</label>
                        <input type="text" name='username' id='username' defaultValue={currentUser.username} />
                    </div>
                    <div className="item">
                        <label htmlFor="email">Email</label>
                        <input type="email" name='email' id='email' defaultValue={currentUser.email} />
                    </div>
                    <div className="item">
                        <label htmlFor="password">Password</label>
                        <input type="password" name='password' id='password' />
                    </div>
                    <button>Update</button>
                </form>
            </div>
            <div className="sideContainer">
                <img src={avatar[0] || currentUser.avatar || '/noavatar.jpg'} alt="" className='avatar' />
                <UploadWidget uwConfig={{
                    multiple: false,
                    cloudName: 'dknpnmf1m',
                    uploadPreset: "carShop",
                    folder: "avatars",
                    maxImageFileSize: 2000000,
                }}
                setState={setAvatar} />
            </div>
        </div>
    )
}

export default ProfileUpdate