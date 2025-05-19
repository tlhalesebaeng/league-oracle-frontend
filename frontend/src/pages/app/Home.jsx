import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { useFetch } from '../../hooks/useFetch.js';
import { showAlert } from '../../store/ui/alert-slice.js';
import MyLeagues from '../../components/league/MyLeagues.jsx';

const Home = () => {
    const isAuth = useSelector((state) => state.auth.isAuthenticated);

    // navigating this way will help us to avoid loading the jsx which happens when using useEffect
    if (!isAuth) return <Navigate to="/" />;

    const { request, error, isLoading } = useFetch();
    const [leagues, setLeagues] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        if (error) {
            dispatch(showAlert('error', 'Could not fetch your leagues'));
            return;
        }

        const getMyLeague = async () => {
            const response = await request('/leagues/mine', 'get');
            if (response) setLeagues(response.data.leagues);
        };

        getMyLeague();
    }, [error]);

    // the styles for layout content class are stored in the RootLayout.css
    return (
        <div className="layout-content">
            {isLoading && <p>Loading...</p>}
            {!isLoading && <MyLeagues leagues={leagues} />}
            <main>
                <h2>Home Page</h2>
            </main>
        </div>
    );
};

export default Home;
