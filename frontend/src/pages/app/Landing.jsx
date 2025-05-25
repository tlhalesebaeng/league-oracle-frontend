import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { uiActions } from '../../store/ui/ui-slice.js';

const Landing = () => {
    const isAuth = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(uiActions.showAuthButtons()); // show the login and get started buttons
    }, []);

    if (isAuth) return <Navigate to="/home" />;

    return (
        <main>
            <h2>Landing Page</h2>
        </main>
    );
};

export default Landing;
