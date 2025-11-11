import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

import { useFetch } from '../../hooks/useFetch.js';
import { showAlert } from '../../store/ui/alert-slice.js';

import Card from '../../components/app/Card.jsx';
import LeagueForm from '../../components/league/LeagueForm.jsx';

const CreateLeague = () => {
    const isAuth = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { request, error, setError, isLoading } = useFetch();

    // Make this page accessible to users that are logged in only (protect the route)
    if (!isAuth) return <Navigate to="/" />;

    useEffect(() => {
        // Check if an error exist to avoid infinity loop
        if (error) {
            // Show an error alert with the error
            dispatch(showAlert('error', error));

            // Reset errors if any
            setError('');
        }
    }, [error]);

    // Function that handles create button click (league form component)
    const handleCreate = async (event, teams, name) => {
        // Prevent browser reload
        event.preventDefault();

        // Send the request
        const response = await request('/leagues', 'post', { name, teams });

        if (response && response.data) {
            // Navigate to a unique league page
            navigate(`/leagues/${response.data.id}`);
        }
    };

    return (
        <main>
            <Card className="large-width">
                <h1>Create new league</h1>
                <LeagueForm onSubmit={handleCreate} loading={isLoading} />
            </Card>
        </main>
    );
};

export default CreateLeague;
