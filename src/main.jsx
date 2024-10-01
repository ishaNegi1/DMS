import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Home, Signup, Login } from './pages/allPages.jsx'
import './index.css'
import {
    createBrowserRouter,
    RouterProvider,
    Navigate
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
        path: '/Login',
        element: <Login />
    },
    {
        path: '/Signup/Login',
        element: <Navigate to="/Login" replace={true} />
    },
    {
        path: '/Login/Signup',
        element: <Navigate to="/Signup" replace={true} />
    },
    {
        path: '*',
        element: <Navigate to="/" replace={true} />
    }
])

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}>
        <App />
    </RouterProvider>
)
