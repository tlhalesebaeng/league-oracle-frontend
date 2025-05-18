import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import RootLayout from './components/app/RootLayout.jsx';
import Signup from './pages/auth/Signup.jsx';
import Login from './pages/auth/Login.jsx';
import Home from './pages/app/Home.jsx';
import Landing from './pages/app/Landing.jsx';
import About from './pages/app/About.jsx';
import Teams from './pages/app/Teams.jsx';
import CreateLeague from './pages/league/CreateLeague.jsx';
import ViewLeague, { leagueDataLoader } from './pages/league/ViewLeague.jsx';
import EditLeague from './pages/league/EditLeague.jsx';
import ViewFixture from './pages/fixture/ViewFixture.jsx';
import EditResult from './pages/result/EditResult.jsx';

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
                        loader: leagueDataLoader,
                    },
                    {
                        path: 'create',
                        element: <CreateLeague />,
                    },
                    {
                        path: 'edit',
                        element: <EditLeague />,
                    },
                ],
            },
            {
                path: 'fixtures',
                children: [
                    {
                        path: ':fixtureId',
                        element: <ViewFixture />,
                    },
                ],
            },
            {
                path: 'results',
                children: [
                    {
                        path: ':resultId',
                        element: <EditResult />,
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
