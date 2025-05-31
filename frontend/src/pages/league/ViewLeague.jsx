import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { uiActions } from '../../store/ui/ui-slice.js';
import api from '../../utils/functions/axiosInstance.js';
import { asyncHandler } from '../../utils/functions/asyncHandler.js';

import View from '../../components/app/View.jsx';

const Leagues = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(uiActions.showAuthButtons());
    }, []);

    return <View />;
};

// loader function to get league, fixtures and results data
export const leagueDataLoader = asyncHandler(async ({ params }) => {
    // request league data
    const leagueResponse = await api.get(`/leagues/${params.leagueId}`);
    const { league } = leagueResponse.data;

    // query for requesting fixtures using the league id
    const fixturesPromise = api.get('/fixtures', {
        params: { leagueId: league._id },
    });

    // query for requesting results using the league id
    const resultsPromise = api.get('/results', {
        params: { leagueId: league._id },
    });

    // await the queries at the same time
    const [fixturesResponse, resultsResponse] = await Promise.all([
        fixturesPromise,
        resultsPromise,
    ]);

    // extract fixtures and results
    const { fixtures } = fixturesResponse.data;
    const { results } = resultsResponse.data;

    return { league, fixtures, results };
});

export default Leagues;
