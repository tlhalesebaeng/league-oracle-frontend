import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFetch } from './useFetch.js';
import { showAlert } from '../store/ui/alert-slice.js';
import { authActions } from '../store/auth-slice.js';

export const useLogout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { request, error, setError, isLoading } = useFetch();

    useEffect(() => {
        if (error) {
            // Show an error alert
            dispatch(showAlert('error', 'Logout failed'));

            // Reset the error to avoid an infinite loop
            setError(''); 
        }
    }, [error]);

    const handleLogout = async () => {
        const response = await request('/auth/logout', 'get'); // remove the access token
        if (response) {
            dispatch(showAlert('success', 'Logout successful'));
            dispatch(authActions.logout());
            navigate('/');
        }
    };

    return { handleLogout, isLoading };
};
