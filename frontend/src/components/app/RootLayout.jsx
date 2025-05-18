import { Outlet, useNavigation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { alertActions, alertTimeout } from '../../store/ui/alert-slice.js';

import Navigation from '../navigation/Navigation.jsx';
import Alert from './Alert.jsx';
import './RootLayout.css';

const RootLayout = () => {
    const alert = useSelector((state) => state.alert);
    const dispatch = useDispatch();
    const navigation = useNavigation();

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
