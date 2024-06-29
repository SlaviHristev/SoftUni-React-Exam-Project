import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './pages/Layout/Layout'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'

function App() {
 const router = createBrowserRouter([
  {
    path:'/',
    element:(
      <Layout/>
    ),
    children:[
      {
        path:'/',
        element: <Home/>
      },
      {
        path:'/login',
        element: <Login/>
      }
    ]
  }
 ])
  return (
    <>
     <RouterProvider router={router}/>
    </>
  )
}

export default App
