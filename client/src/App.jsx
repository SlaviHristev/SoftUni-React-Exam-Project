import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './pages/Layout/Layout'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Catalog from './pages/Catalog/Catalog'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <Layout />
      ),
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/login',
          element: <Login />
        },
        {
          path: '/register',
          element: <Register />
        },
        {
          path:'/catalog',
          element: <Catalog/>
        }
      ]
    }
  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
