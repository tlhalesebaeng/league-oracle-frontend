import { getSearchParams } from '../../utils/functions/searchParams.js';

import api from '../../utils/functions/axiosInstance.js';
import Card from '../../components/app/Card.jsx';
import LeagueName from '../../components/league/LeagueName.jsx';
import EditTeams from '../../components/team/EditTeams.jsx';

const EditLeague = () => {
    return (
        <main>
            <Card className="large-width">
                <LeagueName />
                <EditTeams />
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
