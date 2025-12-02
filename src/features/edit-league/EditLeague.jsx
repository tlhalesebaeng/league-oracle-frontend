import { getSearchParams } from '../../utils/searchParams.js';
import api from '../../utils/axiosInstance.js';
import Card from '../../components/app/card/Card.jsx';
import EditLeagueFields from './fields/EditLeagueFields.jsx';
import { asyncHandler } from '../../utils/asyncHandler.js';

// this page should be protected and only accessible to league creators
const EditLeague = () => {
    return (
        <main className="center wrapper-spacing">
            <Card className="large-width">
                <EditLeagueFields />
            </Card>
        </main>
    );
};

export const editLeagueDataLoader = asyncHandler(async ({ request }) => {
    // get the league id from the search params
    const searchParams = getSearchParams(request);
    const leagueId = searchParams.get('leagueId');

    // get the league data
    const leaguePromise = api.get(`/leagues/${leagueId}`);

    const leagueTeamsPromise = api.get('/teams', { params: { leagueId } });

    const [leagueResponse, teamsResponse] = await Promise.all([
        leaguePromise,
        leagueTeamsPromise,
    ]);

    return { league: leagueResponse.data, teams: teamsResponse.data };
});

export default EditLeague;
