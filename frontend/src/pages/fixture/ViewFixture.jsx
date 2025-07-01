import { useNavigate, useRouteLoaderData } from 'react-router-dom';

import { getSearchParams } from '../../utils/functions/searchParams.js';
import api from '../../utils/functions/axiosInstance.js';
import { asyncHandler } from '../../utils/functions/asyncHandler.js';

import FixtureDetails from '../../components/fixture/FixtureDetails.jsx';

const ViewFixture = () => {
    const routeData = useRouteLoaderData('fixture-route');
    const navigate = useNavigate();

    // Get the fixture from the route data
    const fixture = routeData.fixture;

    // Derive the league data
    const leagueData = {
        _id: fixture.league,
        creator: routeData.creator,
        name: routeData.name,
    };

    // Function ran when we click the cancel button (FixtureDetails component)
    const handleCancelChanges = () => {
        // Navigate the user back to the view league page
        navigate(`/leagues/${fixture.league}`);
    };

    // Function ran when we click the add result button (FixtureDetails component)
    const handleAddResult = () => {
        navigate({
            pathname: '/results/add',
            search: `?fixtureId=${fixture._id}&leagueId=${fixture.league}`,
        });
    };

    return (
        <FixtureDetails
            onCancel={handleCancelChanges}
            onAddResult={handleAddResult}
            leagueData={leagueData}
            fixture={fixture}
        />
    );
};

export const fixtureDataLoader = asyncHandler(async ({ request, params }) => {
    // Get the league id from the url
    const searchParams = getSearchParams(request);
    const leagueId = searchParams.get('leagueId');

    // Get the league fixture
    const response = await api.get(`/fixtures/${params.fixtureId}`, {
        params: { leagueId },
    });

    // Make the league fixture available to the route components
    return response.data;
});

export default ViewFixture;
