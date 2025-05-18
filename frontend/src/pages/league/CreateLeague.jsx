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

    if (!isAuth) return <Navigate to="/" />;

    useEffect(() => {
        if (error) {
            dispatch(showAlert('error', error));
            setError('');
        }
    }, [error]);

    const handleCreate = async (event, teams, name) => {
        event.preventDefault();

        const data = { name, teams }; // name refers to the league name
        const response = await request('/leagues', 'post', data);

        if (response && response.data) {
            navigate({
                pathname: `/leagues/${response.data.league._id}`,
                search: '?tab=standings',
            });
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
