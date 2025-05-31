import { getSearchParams } from '../../utils/functions/searchParams.js';
import FixtureDetails from '../../components/fixture/FixtureDetails.jsx';
import api from '../../utils/functions/axiosInstance.js';
import { asyncHandler } from '../../utils/functions/asyncHandler.js';

const ViewFixture = () => {
    return <FixtureDetails />;
};

export const fixtureDataLoader = asyncHandler(async ({ request, params }) => {
    // get the league id from the url
    const searchParams = getSearchParams(request);
    const leagueId = searchParams.get('leagueId');

    // get the league fixture
    const response = await api.get(`/fixtures/${params.fixtureId}`, {
        params: { leagueId },
    });

    return response.data;
});

export default ViewFixture;
