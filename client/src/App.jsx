import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Layout from './pages/Layout/Layout'
import Home from './pages/Home/Home'

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
