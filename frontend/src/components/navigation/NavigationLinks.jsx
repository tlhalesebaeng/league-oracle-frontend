import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { authActions } from '../../store/auth-slice.js';
import { useFetch } from '../../hooks/useFetch.js';
import { showAlert } from '../../store/ui/alert-slice.js';

import './NavigationLinks.css';

const NavigationLinks = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { request, error, setError, isLoading } = useFetch();

    useEffect(() => {
        if (error) {
            dispatch(showAlert('error', 'Logout failed'));
            setError(''); // reset the error to avoid an infinite loop
        }
    }, [error]);

    const handleCreateLeague = () => {
        navigate('/leagues/create');
    };

    const handleLogout = async () => {
        const response = await request('/auth/logout', 'get'); // remove the access token
        if (response) {
            dispatch(showAlert('success', 'Logout successful'));
            dispatch(authActions.logout());
            navigate('/');
        }
    };

    return (
        <>
            <li
                onClick={handleCreateLeague}
                className="navigation-link__create"
            >
                <svg
                    aria-hidden="true"
                    height="25"
                    viewBox="0 0 16 16"
                    version="1.1"
                    width="25"
                    data-view-component="true"
                >
                    <path d="M7.75 2a.75.75 0 0 1 .75.75V7h4.25a.75.75 0 0 1 0 1.5H8.5v4.25a.75.75 0 0 1-1.5 0V8.5H2.75a.75.75 0 0 1 0-1.5H7V2.75A.75.75 0 0 1 7.75 2Z"></path>
                </svg>
            </li>
            <li onClick={handleLogout} className="navigation-link__logout">
                <p>{isLoading ? 'Loading...' : 'Logout'}</p>
            </li>
        </>
    );
};

export default NavigationLinks;
