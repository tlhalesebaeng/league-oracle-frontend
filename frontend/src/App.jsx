import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import RootLayout from './components/app/RootLayout.jsx';
import Signup from './pages/auth/Signup.jsx';
import Login from './pages/auth/Login.jsx';
import Home from './pages/app/Home.jsx';
import Landing from './pages/app/Landing.jsx';
import Leagues from './pages/app/Leagues.jsx';

const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <Landing />,
            },
            {
                path: 'leagues/:leagueId',
                element: <Leagues />,
            },
            {
                path: 'login',
                element: <Login />,
            },
            {
                path: 'signup',
                element: <Signup />,
            },
            {
                path: 'home',
                element: <Home />,
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={appRouter} />;
}

export default App;
