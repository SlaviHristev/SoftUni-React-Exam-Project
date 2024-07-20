
import { useContext } from 'react'
import './errorPopUp.scss'
import { ErrorContext } from '../../context/ErrorContext'

const ErrorPopUp = () => {
    const {error} = useContext(ErrorContext);
    if(!error) return null;
    
  return (
    <div className='errorPopUp'>
        <p>{error}</p>
    </div>
  )
}

export default ErrorPopUp