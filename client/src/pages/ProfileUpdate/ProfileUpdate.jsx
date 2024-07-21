import { useContext, useState } from 'react';
import UploadWidget from '../../components/UploadWidget/UploadWidget';
import './profileUpdate.scss'
import { AuthContext } from '../../context/AuthContext';
import apiRequest from '../../lib/apiRequest';
import { useNavigate } from 'react-router-dom';
import useError from '../../hooks/useError';

const ProfileUpdate = () => {
    const { currentUser, updateUser } = useContext(AuthContext);
    const [avatar, setAvatar] = useState([]);
    const navigate = useNavigate();
    const { showError } = useError();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const { username, email, password } = Object.fromEntries(formData);

        if (username.length < 4) {
            showError('Username must be at least 4 characters long');
            return;
        }
        if (email.length < 10) {
            showError('Email must be at least 10 characters long');
            return;
        }
        if (password.length < 4) {
            showError('Password must be at least 4 characters long');
            return;
        }
        
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
        } catch (err) {
            const errorMessages = err.response?.data?.errors || ['Profile update failed'];
            errorMessages.forEach(message => showError(message));
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