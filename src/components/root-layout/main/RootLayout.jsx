import { useEffect, useState } from 'react';
import { Outlet, useNavigation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { alertActions, alertTimeout } from '../../../store/ui/alert-slice.js';
import { authActions } from '../../../store/auth-slice.js';
import { useFetch } from '../../../hooks/useFetch.js';
import { sidebarActions } from '../../../store/ui/sidebar-slice.js';

import Navigation from '../../navigation/main/Navigation.jsx';
import Alert from '../alert/Alert.jsx';
import PageSpinner from '../../app/page-spinner/PageSpinner.jsx';
import Sidebar from '../../app/sidebar/Sidebar.jsx';
import Backdrop from '../../../modals/backdrop/Backdrop.jsx';
import './RootLayout.css';

const RootLayout = () => {
    const alert = useSelector((state) => state.alert);
    const sidebarIsShown = useSelector((state) => state.sidebar.isShown);
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

    const handleCloseSidebar = () => {
        // Hide the sidebar
        dispatch(sidebarActions.hideSidebar());

        // Make the page scrollable
        document.getElementsByTagName('body')[0].style.overflow = 'visible'; // Declarative and not recommended
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
            {sidebarIsShown && (
                <>
                    <Backdrop onClose={handleCloseSidebar} />
                    <Sidebar />
                </>
            )}
            <Navigation />
            {navigation.state === 'loading' && <PageSpinner />}
            <Outlet />
        </>
    );
};

export default RootLayout;
