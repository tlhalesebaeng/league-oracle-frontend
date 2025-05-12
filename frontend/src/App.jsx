import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import RootLayout from './components/app/RootLayout.jsx';
import Signup from './pages/auth/Signup.jsx';
import Login from './pages/auth/Login.jsx';
import Home from './pages/app/Home.jsx';
import Landing from './pages/app/Landing.jsx';
import About from './pages/app/About.jsx';
import Teams from './pages/app/Teams.jsx';
import CreateLeague from './pages/league/CreateLeague.jsx';
import ViewLeague from './pages/league/ViewLeague.jsx';

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
                path: 'home',
                element: <Home />,
            },
            {
                path: 'leagues',
                children: [
                    {
                        path: ':leagueId',
                        element: <ViewLeague />,
                    },
                    {
                        path: 'create',
                        element: <CreateLeague />,
                    },
                ],
            },
            {
                path: 'teams/:teamId',
                element: <Teams />,
            },
            {
                path: 'about',
                element: <About />,
            },
            {
                path: 'login',
                element: <Login />,
            },
            {
                path: 'signup',
                element: <Signup />,
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={appRouter} />;
}

export default App;
