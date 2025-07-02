import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import RootLayout from './components/app/RootLayout.jsx';

// App main components
const About = lazy(() => import('./pages/app/About.jsx'));
const Home = lazy(() => import('./pages/app/Home.jsx'));
const Contact = lazy(() => import('./pages/app/Contact.jsx'));
const Landing = lazy(() => import('./pages/app/Landing.jsx'));
const ErrorPage = lazy(() => import('./pages/app/ErrorPage.jsx'));

// Auth routes components
const Login = lazy(() => import('./pages/auth/Login.jsx'));
const Signup = lazy(() => import('./pages/auth/Signup.jsx'));

// League routes components
const ViewLeague = lazy(() => import('./pages/league/ViewLeague.jsx'));
const EditLeague = lazy(() => import('./pages/league/EditLeague.jsx'));
const CreateLeague = lazy(() => import('./pages/league/CreateLeague.jsx'));

// Team routes components
const ViewTeam = lazy(() => import('./pages/team/ViewTeam.jsx'));

// Fixture routes components
const ViewFixture = lazy(() => import('./pages/fixture/ViewFixture.jsx'));

// Result routes components
const EditResult = lazy(() => import('./pages/result/EditResult.jsx'));
const AddResult = lazy(() => import('./pages/result/AddResult.jsx'));

const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        hydrateFallbackElement: <></>,
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
                        loader: (meta) =>
                            import('./pages/league/ViewLeague.jsx').then(
                                (module) => module.leagueDataLoader(meta)
                            ),
                        children: [
                            {
                                index: true,
                                element: <ViewLeague />,
                            },
                            {
                                path: 'teams/:teamId',
                                element: <ViewTeam />,
                            },
                        ],
                    },
                    {
                        path: 'create',
                        element: <CreateLeague />,
                    },
                    {
                        path: 'edit',
                        loader: (meta) =>
                            import('./pages/league/EditLeague.jsx').then(
                                (module) => module.editLeagueDataLoader(meta)
                            ),
                        element: <EditLeague />,
                    },
                ],
            },
            {
                id: 'fixture-route',
                path: 'fixtures',
                loader: (meta) =>
                    import('./pages/fixture/ViewFixture.jsx').then((module) =>
                        module.fixtureDataLoader(meta)
                    ),
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
                children: [
                    {
                        path: 'edit',
                        element: <EditResult />,
                        loader: (meta) =>
                            import('./pages/result/EditResult.jsx').then(
                                (module) => module.editResultDataLoader(meta)
                            ),
                    },
                    {
                        path: 'add',
                        element: <AddResult />,
                        loader: (meta) =>
                            import('./pages/result/AddResult.jsx').then(
                                (module) => module.addResultDataLoader(meta)
                            ),
                    },
                ],
            },
            {
                path: 'contact',
                element: <Contact />,
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
