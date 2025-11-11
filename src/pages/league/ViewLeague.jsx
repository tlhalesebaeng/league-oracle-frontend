import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { uiActions } from '../../store/ui/ui-slice.js';
import api from '../../utils/functions/axiosInstance.js';
import { asyncHandler } from '../../utils/functions/asyncHandler.js';

import View from '../../components/app/View.jsx';

const Leagues = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // Show the login and get started buttons
        dispatch(uiActions.showAuthButtons());
    }, []);

    return <View />;
};

// Loader function to get league, fixtures and results data
export const leagueDataLoader = asyncHandler(async ({ params }) => {
    // Send the request to get the league data
    const leagueResponse = await api.get(`/leagues/${params.leagueId}`);
    const league = leagueResponse.data; // Full league data

    // Query for requesting fixtures using the league id
    const fixturesPromise = api.get('/fixtures', {
        params: { leagueId: league.id },
    });

    // Query for requesting results using the league id
    const resultsPromise = api.get('/results', {
        params: { leagueId: league.id },
    });

    // Await the queries at the same time
    const [fixturesResponse, resultsResponse] = await Promise.all([
        fixturesPromise,
        resultsPromise,
    ]);

    // Extract fixtures and results
    const fixtures = fixturesResponse.data;
    const results = resultsResponse.data;

    // Make the league, fixtures and results data available to the route components
    return { league, fixtures, results };
});

export default Leagues;
