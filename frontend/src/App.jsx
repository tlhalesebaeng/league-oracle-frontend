import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ViewLeague, { leagueDataLoader } from './pages/league/ViewLeague.jsx';
import EditLeague, {
    editLeagueDataLoader,
} from './pages/league/EditLeague.jsx';
import ViewFixture, {
    fixtureDataLoader,
} from './pages/fixture/ViewFixture.jsx';
import EditResult, {
    editResultDataLoader,
} from './pages/result/EditResult.jsx';

import RootLayout from './components/app/RootLayout.jsx';
import Signup from './pages/auth/Signup.jsx';
import Login from './pages/auth/Login.jsx';
import Home from './pages/app/Home.jsx';
import Landing from './pages/app/Landing.jsx';
import About from './pages/app/About.jsx';
import Teams from './pages/team/Teams.jsx';
import CreateLeague from './pages/league/CreateLeague.jsx';

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
                        id: 'league-route',
                        path: ':leagueId',
                        loader: leagueDataLoader,
                        children: [
                            {
                                index: true,
                                element: <ViewLeague />,
                            },
                            {
                                path: 'teams/:teamId',
                                element: <Teams />,
                            },
                        ],
                    },
                    {
                        path: 'create',
                        element: <CreateLeague />,
                    },
                    {
                        path: 'edit',
                        loader: editLeagueDataLoader,
                        element: <EditLeague />,
                    },
                ],
            },
            {
                id: 'fixture-route',
                path: 'fixtures',
                loader: fixtureDataLoader,
                children: [
                    {
                        path: ':fixtureId',
                        element: <ViewFixture />,
                    },
                ],
            },
            {
                id: 'result-route',
                path: 'results',
                loader: editResultDataLoader,
                children: [
                    {
                        path: 'edit',
                        element: <EditResult />,
                    },
                ],
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

// TODO: Updating fixtures and results with clicking versus and edit is okay and very easy
// but for many updates this becomes slow and time consuming. Find a way to do this in a quicker way
// for example we might wanna use drag and drop to add fixtures under the same date and venue, etc..

function App() {
    return <RouterProvider router={appRouter} />;
}

export default App;
