import {Navigate, Outlet} from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import './layout.scss'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

const Layout = () => {
  return (
    <div className='layout'>
        <div className="navbar">
            <Navbar/>
        </div>
        <div className="content">
            <Outlet/>
        </div>
    </div>
  )
}


const RequireAuth = () =>{
  const {currentUser} = useContext(AuthContext);
  if(!currentUser){
    return <Navigate to='/login' />
  }

  return(
    currentUser && (
      <div className='layout'>
        <div className="navbar">
          <Navbar/>
        </div>
        <div className="content">
          <Outlet/>
        </div>
      </div>
    )
  )
}
export {Layout,RequireAuth}