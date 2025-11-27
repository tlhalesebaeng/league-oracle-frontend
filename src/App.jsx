import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import RootLayout from './components/root-layout/main/RootLayout.jsx';
import PageSpinner from './components/app/page-spinner/PageSpinner.jsx';

// App main components
const About = lazy(() => import('./features/app/about/About.jsx'));
const Home = lazy(() => import('./features/app/home/Home.jsx'));
const Contact = lazy(() => import('./features/app/contact/Contact.jsx'));
const Landing = lazy(() => import('./features/app/landing/Landing.jsx'));
const ErrorPage = lazy(() => import('./features/app/errors/ErrorPage.jsx'));

// Auth routes components
const Login = lazy(() => import('./features/auth/login/Login.jsx'));
const Signup = lazy(() => import('./features/auth/signup/Signup.jsx'));

// League routes components
const ViewLeague = lazy(() => import('./features/view-league/ViewLeague.jsx'));
const EditLeague = lazy(() => import('./features/edit-league/EditLeague.jsx'));
const CreateLeague = lazy(() =>
    import('./features/create-league/CreateLeague.jsx')
);

// Team routes components
const ViewTeam = lazy(() => import('./features/view-team/ViewTeam.jsx'));

// Fixture routes components
const ViewFixture = lazy(() =>
    import('./features/view-fixture/ViewFixture.jsx')
);

// Result routes components
const EditResult = lazy(() => import('./features/edit-result/EditResult.jsx'));
const AddResult = lazy(() => import('./features/add-result/AddResult.jsx'));

const Suspend = ({ children }) => {
    return <Suspense fallback={<PageSpinner />}>{children}</Suspense>;
};

const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        hydrateFallbackElement: <></>,
        children: [
            {
                index: true,
                element: (
                    <Suspend>
                        <Landing />
                    </Suspend>
                ),
            },
            {
                id: 'home-route',
                path: 'home',
                loader: (meta) =>
                    import('./features/app/home/Home.jsx').then((module) =>
                        module.homeDataLoader(meta)
                    ),
                element: (
                    <Suspend>
                        <Home />
                    </Suspend>
                ),
            },
            {
                path: 'leagues',
                children: [
                    {
                        id: 'league-route',
                        path: ':leagueId',
                        loader: (meta) =>
                            import(
                                './features/view-league/ViewLeague.jsx'
                            ).then((module) => module.leagueDataLoader(meta)),
                        children: [
                            {
                                index: true,
                                element: (
                                    <Suspend>
                                        <ViewLeague />
                                    </Suspend>
                                ),
                            },
                            {
                                path: 'teams/:teamId',
                                element: (
                                    <Suspend>
                                        <ViewTeam />
                                    </Suspend>
                                ),
                            },
                        ],
                    },
                    {
                        path: 'create',
                        element: (
                            <Suspend>
                                <CreateLeague />
                            </Suspend>
                        ),
                    },
                    {
                        path: 'edit',
                        loader: (meta) =>
                            import(
                                './features/edit-league/EditLeague.jsx'
                            ).then((module) =>
                                module.editLeagueDataLoader(meta)
                            ),
                        element: (
                            <Suspend>
                                <EditLeague />
                            </Suspend>
                        ),
                    },
                ],
            },
            {
                id: 'fixture-route',
                path: 'fixtures',
                loader: (meta) =>
                    import('./features/view-fixture/ViewFixture.jsx').then(
                        (module) => module.fixtureDataLoader(meta)
                    ),
                children: [
                    {
                        path: ':fixtureId',
                        element: (
                            <Suspend>
                                <ViewFixture />
                            </Suspend>
                        ),
                    },
                ],
            },
            {
                id: 'result-route',
                path: 'results',
                children: [
                    {
                        path: 'edit',
                        element: (
                            <Suspend>
                                <EditResult />
                            </Suspend>
                        ),
                        loader: (meta) =>
                            import(
                                './features/edit-result/EditResult.jsx'
                            ).then((module) =>
                                module.editResultDataLoader(meta)
                            ),
                    },
                    {
                        path: 'add',
                        element: (
                            <Suspend>
                                <AddResult />
                            </Suspend>
                        ),
                        loader: (meta) =>
                            import('./features/add-result/AddResult.jsx').then(
                                (module) => module.addResultDataLoader(meta)
                            ),
                    },
                ],
            },
            {
                path: 'contact',
                element: (
                    <Suspend>
                        <Contact />
                    </Suspend>
                ),
            },
            {
                path: 'about',
                element: (
                    <Suspend>
                        <About />
                    </Suspend>
                ),
            },
            {
                path: 'login',
                element: (
                    <Suspend>
                        <Login />
                    </Suspend>
                ),
            },
            {
                path: 'signup',
                element: (
                    <Suspend>
                        <Signup />
                    </Suspend>
                ),
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
