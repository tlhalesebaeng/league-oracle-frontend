import { useNavigate, useRouteLoaderData } from 'react-router-dom';

import { getSearchParams } from '../../utils/functions/searchParams.js';
import api from '../../utils/functions/axiosInstance.js';
import { asyncHandler } from '../../utils/functions/asyncHandler.js';

import FixtureDetails from '../../components/fixture/FixtureDetails.jsx';

const ViewFixture = () => {
    const routeData = useRouteLoaderData('fixture-route');
    const navigate = useNavigate();

    // Function ran when we click the cancel button (FixtureDetails component)
    const handleCancelChanges = () => {
        // Navigate the user back to the view league page
        navigate(`/leagues/${routeData.league.id}`);
    };

    // Function ran when we click the add result button (FixtureDetails component)
    const handleAddResult = () => {
        navigate({
            pathname: '/results/add',
            search: `?fixtureId=${routeData.fixture.id}&leagueId=${routeData.league.id}`,
        });
    };

    return (
        <FixtureDetails
            onCancel={handleCancelChanges}
            onAddResult={handleAddResult}
            leagueData={routeData.league}
            fixture={routeData.fixture}
        />
    );
};

export const fixtureDataLoader = asyncHandler(async ({ request, params }) => {
    // Get the league id from the search query
    const searchParams = getSearchParams(request);
    const leagueId = searchParams.get('leagueId');

    // Query for getting a fixture
    const fixtureQuery = api.get(`/fixtures/${params.fixtureId}`);

    // Query for getting the league using the league id
    const leagueQuery = api.get(`/leagues/${leagueId}`);

    const [fixtureResponse, leagueResponse] = await Promise.all([
        fixtureQuery,
        leagueQuery,
    ]);

    // Make the league fixture available to the route components
    return { fixture: fixtureResponse.data, league: leagueResponse.data };
});

export default ViewFixture;
