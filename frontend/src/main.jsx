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
import Join from './pages/join'
import Review from './pages/review'

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
        path: 'join',
        element: <Join />,
      },
      {
        path: 'review',
        element: <Review/>,
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
