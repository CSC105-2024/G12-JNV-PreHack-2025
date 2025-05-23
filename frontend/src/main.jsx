import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Homepage from './pages/homepage'
import VolunteerActivity from './pages/volunteeractivity'
import Login from './pages/login'
import Register from './pages/register'
import Navbar from './components/navbar' 
import Myactivity from './pages/myactivity'
import Request from './pages/request'
import Review from './pages/review'
import Join from './pages/join'
import Accountsetting from './pages/accountsetting'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navbar />,
    children: [
      {
        index: true, 
        element: <Homepage />,
      },
      {
        path: 'myactivity',
        element: <Myactivity />,

      },
      {
        path: 'volunteeractivity',
        element: <VolunteerActivity />,
      },
      {
        path: 'request',
        element: <Request />,
      },
      {
        path: 'review',
        element: <Review />,
      },
      {
        path: 'join',
        element: <Join />,
      },
      {
        path: 'accountsetting',
        element: <Accountsetting />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
