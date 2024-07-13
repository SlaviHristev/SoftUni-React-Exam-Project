import { Link, useNavigate } from 'react-router-dom'
import './login.scss'
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import apiRequest from '../../lib/apiRequest';

const Login = () => {

  const {updateUser} = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) =>{
    e.preventDefault();

    const formData = new FormData(e.target);

    const username = formData.get('username');
      const password = formData.get('password');

      try {
        const res = await apiRequest.post('/auth/login',{
            username,password
        });

        updateUser(res.data)

        navigate('/');
    } catch (err) {
        console.log(err);
  
    }
  }

  return (
    <div className='login'>
        <div className="formContainer">
            <form onSubmit={handleSubmit}>
                <h1>Welcome back</h1>
                <input type="text" name='username' placeholder='Usename' required/>
                <input type="password" name='password' placeholder='Password' required/>
                <button>Login</button>
                <Link to={'/register'}>Don`t have an account?</Link>
            </form>
        </div>
        <div className="imgContainer">
            <img src="/background3.png" alt="" />
        </div>
    </div>
  )
}

export default Login