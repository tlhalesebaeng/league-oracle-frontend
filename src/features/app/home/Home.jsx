import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { useFetch } from '../../../hooks/useFetch.js';
import { showAlert } from '../../../store/ui/alert-slice.js';
import MyLeagues from './my-leagues/MyLeagues.jsx';
import Dashboard from './dashboard/Dashboard.jsx';

const Home = () => {
    const isAuth = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user);

    const { request, error, isLoading } = useFetch();
    const [leagues, setLeagues] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        if (error) {
            dispatch(showAlert('error', 'Could not fetch your leagues'));
            return;
        }

        const getMyLeague = async () => {
            const response = await request('/leagues/mine', 'get');
            if (response) setLeagues(response.data);
        };

        getMyLeague();
    }, [error]);

    // navigating this way will help us to avoid loading the jsx which happens when using useEffect
    if (!isAuth) return <Navigate to="/" />;

    // the styles for layout content class are stored in the RootLayout.css
    return (
        <div className="layout-content">
            <MyLeagues
                type="my-leagues__home"
                loading={isLoading}
                leagues={leagues}
            />
            <main>
                <Dashboard user={user} />
            </main>
        </div>
    );
};

export default Home;
