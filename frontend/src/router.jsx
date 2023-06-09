import { createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import About from './pages/About';
import Profile from './pages/Profile';
import Register from './pages/Register';
// import Chat from './pages/Chat';
import ProtectedLayout from './components/ProtectedLayout';
import GuestLayout from './components/GuestLayout';
import NewsFeed from "./pages/NewsFeed.jsx";
import Preference from "./pages/Preference.jsx";
import PreferenceNews from "./pages/PreferenceNews.jsx";
import ChatComponent from "./pages/Chat";

const router = createBrowserRouter([
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/Login',
                element: <Login />,
            },
            {
                path: '/',
                element: <ChatComponent />,
            },
            {
                path: '/register',
                element: <Register />,
            },
        ],
    },
    {
        path: '/',
        element: <ProtectedLayout />,
        children: [
            {
                path: '/about',
                element: <About />,
            },
            {
                path: '/profile',
                element: <Profile />,
            },
            {
                path: '/news',
                element: <NewsFeed />,
            },
            {
                path: '/preference',
                element: <Preference />,
            },
            {
                path: '/news-preference',
                element: <PreferenceNews />,
            }
        ],
    },
]);

export default router;
