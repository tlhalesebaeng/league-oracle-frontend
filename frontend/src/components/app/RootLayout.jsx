import { Outlet, useLoaderData, useNavigation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { alertActions, alertTimeout } from '../../store/ui/alert-slice.js';
import { authActions } from '../../store/auth-slice.js';

import Navigation from '../navigation/Navigation.jsx';
import Alert from './Alert.jsx';
import './RootLayout.css';
import api from '../../utils/functions/axiosInstance.js';

const RootLayout = () => {
    const alert = useSelector((state) => state.alert);
    const user = useLoaderData();
    const dispatch = useDispatch();
    const navigation = useNavigation();

    if (user) {
        dispatch(authActions.authenticate(user));
    }

    const handleCloseAlert = () => {
        dispatch(alertActions.hideAlert());
        if (alertTimeout) clearTimeout(alertTimeout); // clear the time out set by the showAlert action creator
    };

    return (
        <>
            {alert.isShown && (
                <Alert
                    type={alert.type}
                    message={alert.message}
                    onClose={handleCloseAlert}
                />
            )}
            <Navigation />
            {navigation.state === 'loading' && <p>Loading...</p>}
            <Outlet />
        </>
    );
};

export default RootLayout;

export const authLoader = async () => {
    // this loader checks if we are logged in when we first load the app
    // it only runs once since its the root layout loader
    const response = await api.get('/auth/check');
    if (response && response.data && response.data.isAuth) {
        return response.data.user;
    }
};
