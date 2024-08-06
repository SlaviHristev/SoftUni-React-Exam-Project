import { Link, useNavigate } from 'react-router-dom'
import './register.scss'
import apiRequest from '../../lib/apiRequest';
import useError from '../../hooks/useError';
import {motion} from 'framer-motion';
import useRedirectIfLoggedIn from '../../hooks/useRedirectIfLoggedIn';

const Register = () => {
  useRedirectIfLoggedIn()

  const navigate = useNavigate();
  const { showError } = useError();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      const res = await apiRequest.post('/auth/register', {
        username, email, password
      });
      navigate('/login')
    } catch (err) {
      const errorMessages = err.response?.data?.errors || ['Registration failed'];
      errorMessages.forEach(message => showError(message));
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
    <motion.div className='register'>
      <motion.div className="formContainer" variants={variant2} initial='initial' animate='animate'>
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input type="text" name='username' placeholder='Username' />
          <input type="text" name='email' placeholder='Email' />
          <input type="password" name='password' placeholder='Password' />
          <button>Register</button>
          <Link to='/login'>Already have an account?</Link>
        </form>
      </motion.div>
      <motion.div className="imgContainer">
        <motion.img src="/background2.png" alt=""  variants={variant1} initial='initial' animate='animate'/>
      </motion.div>
    </motion.div>
  )
}

export default Register