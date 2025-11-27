import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { asyncHandler } from '../../../utils/asyncHandler.js';

import MyLeagues from './my-leagues/MyLeagues.jsx';
import Dashboard from './dashboard/Dashboard.jsx';
import api from '../../../utils/axiosInstance.js';

const Home = () => {
    const isAuth = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user);

    // navigating this way will help us to avoid loading the jsx which happens when using useEffect
    if (!isAuth) return <Navigate to="/" />;

    // the styles for layout content class are stored in the RootLayout.css
    return (
        <div className="layout-content">
            <MyLeagues type="my-leagues__home" />
            <main>
                <Dashboard user={user} />
            </main>
        </div>
    );
};

export default Home;

export const homeDataLoader = asyncHandler(async () => {
    // Get the leagues for the logged in user
    const response = await api.get('/leagues/mine');

    // Return the data to make it accessible to components under this route
    return response.data;
});
