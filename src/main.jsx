import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {Home, Signup, Login} from './pages/allPages.jsx'
import './index.css'
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

const router = createBrowserRouter([
    {
     path: '/',
     element: <Home />   
    },
    {
     path: '/Signup',
     element: <Signup />
    },
    {
     path: '/Signup/Login',
     element: <Login />
    },
    {
     path: '/Login/Signup',
     element: <Signup />
    },
    {
     path: '/Login',
     element: <Login />
    },
    
])

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}>
    <App />
    </RouterProvider>
)
