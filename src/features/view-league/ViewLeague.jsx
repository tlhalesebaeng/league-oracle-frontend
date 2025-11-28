import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { uiActions } from '../../store/ui/ui-slice.js';
import api from '../../utils/axiosInstance.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

import View from '../../components/league-view/main/View.jsx';

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
    const leaguePromise = api.get(`/leagues/${params.leagueId}`);

    const leagueTeamsPromise = api.get('/teams', {
        params: { leagueId: params.leagueId },
    });

    const fixturesPromise = api.get('/fixtures', {
        params: { leagueId: params.leagueId },
    });

    // Query for requesting results using the league id
    const resultsPromise = api.get('/results', {
        params: { leagueId: params.leagueId },
    });

    // Await the queries at the same time
    const [fixturesResponse, resultsResponse, leagueResponse, teamsResponse] =
        await Promise.all([
            fixturesPromise,
            resultsPromise,
            leaguePromise,
            leagueTeamsPromise,
        ]);

    // Make the league, fixtures and results data available to the route components
    return {
        league: leagueResponse.data,
        fixtures: fixturesResponse.data,
        results: resultsResponse.data,
        teams: teamsResponse.data,
    };
});

export default Leagues;
