import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { alertActions } from '../../store/ui/alert-slice.js';
import Navigation from '../navigation/Navigation.jsx';
import Alert from './Alert.jsx';
import './RootLayout.css';

const RootLayout = () => {
    const alert = useSelector((state) => state.alert);
    const dispatch = useDispatch();

    const handleCloseAlert = () => {
        // the timeout that removes the alert is still running and this does not clear it
        dispatch(alertActions.hideAlert());
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
            <Outlet />
        </>
    );
};

export default RootLayout;
