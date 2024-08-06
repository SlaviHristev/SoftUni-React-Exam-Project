import { Link, useNavigate } from 'react-router-dom'
import './login.scss'
import { AuthContext } from '../../context/AuthContext';
import apiRequest from '../../lib/apiRequest';
import useError from '../../hooks/useError';
import { useContext } from 'react';
import { motion } from 'framer-motion';
import useRedirectIfLoggedIn from '../../hooks/useRedirectIfLoggedIn';



const Login = () => {
  useRedirectIfLoggedIn();

  const { updateUser } = useContext(AuthContext);
  const { showError } = useError();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const username = formData.get('username');
    const password = formData.get('password');

    try {
      const res = await apiRequest.post('/auth/login', {
        username, password
      });

      updateUser(res.data)

      navigate('/');
    } catch (err) {
      showError(err.response?.data?.message || 'Login failed');
    }
  }

  const variant1 = {
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
  const variant2 = {
    initial: {
      y: -500,
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
    <motion.div className='login'>
      <motion.div  className="formContainer" variants={variant1} initial='initial' animate='animate' >
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input type="text" name='username' placeholder='Usename' required />
          <input type="password" name='password' placeholder='Password' required />
          <button>Login</button>
          <Link to={'/register'}>Don`t have an account?</Link>
        </form>
      </motion.div>
      <motion.div className="imgContainer">
        <motion.img src="/background3.png" alt=""  variants={variant2} initial='initial' animate='animate'/>
      </motion.div>
    </motion.div>
  )
}

export default Login