import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Home, Signup, Login, User } from './pages/allPages.jsx'
import './index.css'
import {
    createBrowserRouter,
    RouterProvider,
    Navigate
} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store/store.js'

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
        path: '/User',
        element: <User />
    },
    {
        path: '/User/:id/*',
        element: <User />
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
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
)
