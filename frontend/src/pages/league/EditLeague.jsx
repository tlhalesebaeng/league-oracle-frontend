import { getSearchParams } from '../../utils/functions/searchParams.js';
import api from '../../utils/functions/axiosInstance.js';
import Card from '../../components/app/Card.jsx';
import EditLeagueFields from '../../components/league/EditLeagueFields.jsx';

// this page should be protected and only accessible to league creators
const EditLeague = () => {
    return (
        <main>
            <Card className="large-width">
                <EditLeagueFields />
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
