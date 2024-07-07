import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import  {Layout, RequireAuth } from './pages/Layout/Layout'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Catalog from './pages/Catalog/Catalog'
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'
import Create from './pages/Create/Create'
import SinglePage from './pages/SinglePage/SinglePage'

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
          path: '/catalog',
          element: <Catalog />
        },
        {
          path: '/about',
          element: <About />
        },
        {
          path: '/contact',
          element: <Contact />
        },
        {
          path: '/:id',
          element: <SinglePage />
        },
      ]
    },
    {
      path: '/',
      element: <RequireAuth />,
      children: [
        {
          path: '/create',
          element: <Create />
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
