import { useEffect, useState } from 'react';
import { Outlet, useNavigation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { alertActions, alertTimeout } from '../../store/ui/alert-slice.js';
import { authActions } from '../../store/auth-slice.js';
import { useFetch } from '../../hooks/useFetch.js';

import Navigation from '../navigation/Navigation.jsx';
import Alert from './Alert.jsx';
import PageSpinner from './PageSpinner.jsx';
import './RootLayout.css';

const RootLayout = () => {
    const alert = useSelector((state) => state.alert);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { request } = useFetch();
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const response = await request('/auth/check', 'get');
            if (response && response.data.user) {
                dispatch(authActions.authenticate(response.data.user));
            }
            setAuthChecked(true);
        };

        checkAuth();
    }, []);

    const handleCloseAlert = () => {
        dispatch(alertActions.hideAlert());
        if (alertTimeout) clearTimeout(alertTimeout); // clear the time out set by the showAlert action creator
    };

    // this will prevent rendering the whole app before authentication is checked
    if (!authChecked) {
        return <PageSpinner />;
    }

    return (
        <>
            {alert.isShown && (
                <Alert
                    type={alert.type || 'error'}
                    message={alert.message || 'no message provided'}
                    onClose={handleCloseAlert}
                />
            )}
            <Navigation />
            {navigation.state === 'loading' && <PageSpinner />}
            <Outlet />
        </>
    );
};

export default RootLayout;
