import { useRef } from 'react';
import { useLoaderData } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getSearchParams } from '../../utils/functions/searchParams.js';

import { uiActions } from '../../store/ui/ui-slice.js';
import { useFetch } from '../../hooks/useFetch.js';
import api from '../../utils/functions/axiosInstance.js';

import Card from '../../components/app/Card.jsx';
import EditTeams from '../../components/team/EditTeams.jsx';
import EditField from '../../components/app/EditField.jsx';

// this page should be protected and only accessible to league creators
const EditLeague = () => {
    const league = useLoaderData();
    const dispatch = useDispatch();
    const { request, error, isLoading } = useFetch();
    const leagueNameRef = useRef();

    // persist the changes to the backend
    const handlePersistChanges = async (data) => {
        if (leagueNameRef.current) {
            // this will only execute when the input field is shown
            if (leagueNameRef.current.value !== league.name) {
                const requestData = { name: leagueNameRef.current.value };
                await request(`/leagues/${league._id}`, 'patch', requestData);
            }

            // this will only execute when the heading field is shown
            if (leagueNameRef.current.innerText !== league.name) {
                const requestData = { name: leagueNameRef.current.innerText };
                await request(`/leagues/${league._id}`, 'patch', requestData);
            }
        }

        console.log(data.renamed);
    };

    const handleConfirmChanges = () => {
        dispatch(uiActions.showConfirmModal());
    };

    return (
        <main>
            <Card className="large-width">
                <EditField ref={leagueNameRef} tag="h2" name={league.name} />
                <EditTeams
                    isLoading={isLoading}
                    error={error}
                    onSave={handleConfirmChanges} // this handler runs when we click changes
                    onConfirm={handlePersistChanges} // this handler runs when we click confirm on the modal
                    league={league}
                />
            </Card>
        </main>
    );
};

export const editLeagueDataLoader = async ({ request }) => {
    // get the league id from the search params
    const searchParams = getSearchParams(request);
    const leagueId = searchParams.get('leagueId');

    // get the league data
    const response = await api.get(`/leagues/${leagueId}`);

    // TODO: Handle rejected promises of this request

    return response.data.league;
};

export default EditLeague;
