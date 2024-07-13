import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './navbar.scss';
import { useContext } from 'react';
import apiRequest from '../../lib/apiRequest';


const Navbar = () => {
    const { updateUser, currentUser } = useContext(AuthContext);

    const navigate = useNavigate();


    const handleLogout = async () => {
        try {
            await apiRequest.post('/auth/logout');
            updateUser(null);
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }
    return (

        <nav>
            <div className="leftSide">
                <Link to='/' className='logo'>
                    <img src="/logo.png" alt="" />
                    <span>Car Shop</span>
                </Link>
                <Link to="/">Home</Link>
                <Link to="/catalog">Catalog</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
                {currentUser && <Link to="/create">Create</Link>}
            </div>
            <div className="rightSide">
                {currentUser ?
                    <div className='user'>
                        <img src={currentUser.avatar || '/noavatar.jpg'} alt="" />
                        <span >{currentUser.username}</span> 
                        <Link to='/profile' className='profile'>
                            <span>Profile</span>
                        </Link>
                        <Link onClick={handleLogout}>Logout</Link>
                    </div>
                    :
                    <>
                        <Link to="/login">Sign In</Link>
                        <Link to="/register">Sign Up</Link>
                    </>
                }

            </div>
        </nav>
    )
}

export default Navbar