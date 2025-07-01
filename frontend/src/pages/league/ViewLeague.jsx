import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { uiActions } from '../../store/ui/ui-slice.js';
import api from '../../utils/functions/axiosInstance.js';
import { asyncHandler } from '../../utils/functions/asyncHandler.js';

import View from '../../components/app/View.jsx';

const Leagues = () => {
    const dispatch = useDispatch();

    // Function ran when the results tab is clicked (Tablist component)
    const handleChangeTab = (tabName) => {
        dispatch(uiActions.setTab(tabName)); // Set the active tab to be the given tab name
    };

    // List of all the tabs
    const tabList = [
        { _id: 'tab-1', name: 'Standings' },
        { _id: 'tab-2', name: 'Fixtures' },
        { _id: 'tab-3', name: 'Results' },
    ];

    useEffect(() => {
        // Show the login and get started buttons
        dispatch(uiActions.showAuthButtons());
    }, []);

    return <View tabList={tabList} onChangeTab={handleChangeTab} />;
};

// Loader function to get league, fixtures and results data
export const leagueDataLoader = asyncHandler(async ({ params }) => {
    // Send the request to get the league data
    const leagueResponse = await api.get(`/leagues/${params.leagueId}`);
    const { league } = leagueResponse.data; // Full league data

    // Query for requesting fixtures using the league id
    const fixturesPromise = api.get('/fixtures', {
        params: { leagueId: league._id },
    });

    // Query for requesting results using the league id
    const resultsPromise = api.get('/results', {
        params: { leagueId: league._id },
    });

    // Await the queries at the same time
    const [fixturesResponse, resultsResponse] = await Promise.all([
        fixturesPromise,
        resultsPromise,
    ]);

    // Extract fixtures and results
    const { fixtures } = fixturesResponse.data;
    const { results } = resultsResponse.data;

    // Make the league, fixtures and results data available to the route components
    return { league, fixtures, results };
});

export default Leagues;
