import { Link } from 'react-router-dom'
import './notFound.scss'

const NotFound = () => {
  return (
    <div className='notFound'>
        <h1>404</h1>
        <p>Page Not Found</p>
        <Link to="/">Go to Home</Link>
    </div>
  )
}

export default NotFound;