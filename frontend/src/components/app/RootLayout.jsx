import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/ui-slice.js';
import Navigation from '../navigation/Navigation.jsx';
import Alert from './Alert.jsx';
import './RootLayout.css';

const RootLayout = () => {
    const alert = useSelector((state) => state.ui.alert);
    const dispatch = useDispatch();

    const handleCloseAlert = () => {
        // the timeout that removes the alert is still running and this does not clear it
        dispatch(uiActions.hideAlert());
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
