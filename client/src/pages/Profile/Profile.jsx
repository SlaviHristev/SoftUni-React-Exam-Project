import './profile.scss'
import {Link} from 'react-router-dom';

const Profile = () => {
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
                    <span>Avatar:</span>
                    <span>Username:</span>
                    <span>Email:</span>
                </div>
                <div className="title">
                    <h1>My Posts</h1>
                    <Link to='/create'>
                        <button>Create New Post</button>
                    </Link>
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