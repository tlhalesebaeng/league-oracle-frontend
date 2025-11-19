import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouteError } from 'react-router-dom';
import { uiActions } from '../../../store/ui/ui-slice.js';
import Error from '../../../components/app/error/Error.jsx';
import Navigation from '../../../components/navigation/main/Navigation.jsx';

const ErrorPage = () => {
    const dispatch = useDispatch();
    const routeError = useRouteError();

    useEffect(() => {
        dispatch(uiActions.showAuthButtons());
    }, []);

    const error = {
        title: 'An error occurred',
        message: 'Please try again later',
        status: 500,
    };

    if (routeError.status === 404) {
        error.status = 404;
        error.title = 'Page not found';
        error.message = 'This page does not exist in this system';
    }

    if (import.meta.env.VITE_ENVIRONMENT === 'development') {
        console.log(routeError);
    }

    return (
        <>
            <Navigation />
            <main>
                <Error error={error} />
            </main>
        </>
    );
};

export default ErrorPage;
