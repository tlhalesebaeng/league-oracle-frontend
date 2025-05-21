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
        const currElement = leagueNameRef.current; // will always be available, it cannot be falsy
        const newLeagueName = currElement.value || currElement.innerText; // this ensures that we always have a new league name, this cannot be falsy

        if (newLeagueName !== league.name) {
            // the league name was changed
            await request(`/leagues/${league._id}`, 'patch', {
                name: newLeagueName,
            });
        }
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
