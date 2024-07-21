import { useContext, useState } from 'react';
import UploadWidget from '../../components/UploadWidget/UploadWidget';
import './profileUpdate.scss'
import { AuthContext } from '../../context/AuthContext';
import apiRequest from '../../lib/apiRequest';
import { useNavigate } from 'react-router-dom';
import useError from '../../hooks/useError';
import {motion} from 'framer-motion';

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

    const variants = {
        initial: {
            y: 500,
            opacity: 0
        },
        animate: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 1,
                staggerChildren: 0.1,
            },
        }
    };
    return (
        <div className='profileUpdate' >
            <motion.div className="formContainer" variants={variants} initial='initial' whileInView='animate'>
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
            </motion.div>
            <motion.div className="sideContainer" variants={variants} initial={{y:-400}} whileInView='animate'>
                <img src={avatar[0] || currentUser.avatar || '/noavatar.jpg'} alt="" className='avatar' />
                <UploadWidget uwConfig={{
                    multiple: false,
                    cloudName: 'dknpnmf1m',
                    uploadPreset: "carShop",
                    folder: "avatars",
                    maxImageFileSize: 2000000,
                }}
                    setState={setAvatar} />
            </motion.div>
        </div>
    )
}

export default ProfileUpdate