import './userProfile.scss'

const UserProfile = () => {
  return (
    <div className='userProfile'>
        <div className="userInfo">
            <img src='' alt="username" />
            <h2>Username</h2>
            <p>Email</p>
            <button>Message</button>
        </div>
        <div className="profilePosts">
            <h3>Posts</h3>
            
        </div>
    </div>
  )
}

export default UserProfile;