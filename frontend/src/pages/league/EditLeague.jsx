import { useRef, useState } from 'react';
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
    const [leagueName, setLeagueName] = useState(league.name);

    // persist the changes to the backend
    const handlePersistChanges = async (data) => {
        // use async functions so that we can rename, delete and add without awaiting for each one of this to finish firstly

        const updateLeagueName = async () => {
            if (leagueName !== league.name) {
                // the league name was changed
                await request(`/leagues/${league._id}`, 'patch', {
                    name: leagueName,
                });
            }
        };

        const changeNames = async () => {
            // change the team names if any names were changed
            const renamedTeams = data.renamed;
            for (let i = 0; i < renamedTeams.length; i++) {
                const data = { name: renamedTeams[i].newName };
                await request(
                    `/leagues/${league._id}/teams/${renamedTeams[i]._id}`,
                    'patch',
                    data
                );
            }
        };

        const addTeams = async () => {
            // add teams if there are teams to add
            const addedTeams = data.added;
            for (let i = 0; i < addedTeams.length; i++) {
                const data = { name: addedTeams[i].name };
                await request(`/leagues/${league._id}/teams/`, 'post', data);
            }
        };

        const deleteTeams = async () => {
            // delete teams if there are teams to be deleted
            const deletedTeams = data.deleted;
            for (let i = 0; i < deletedTeams.length; i++) {
                await request(
                    `/leagues/${league._id}/teams/${deletedTeams[i]._id}`,
                    'delete'
                );
            }
        };

        // finished defining functions execute this fuctions
        addTeams();
        changeNames();
        updateLeagueName();
        deleteTeams();
    };

    const handleConfirmChanges = () => {
        dispatch(uiActions.showConfirmModal());
    };

    return (
        <main>
            <Card className="large-width">
                <EditField
                    onInputChange={(value) => setLeagueName(value)}
                    tag="h2"
                    placeholder={league.name}
                    value={leagueName}
                />
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
