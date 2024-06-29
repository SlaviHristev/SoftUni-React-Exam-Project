import { Link } from 'react-router-dom'
import './login.scss'

const Login = () => {
  return (
    <div className='login'>
        <div className="formContainer">
            <form>
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