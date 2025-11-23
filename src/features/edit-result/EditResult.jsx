import { useDispatch } from 'react-redux';
import { useLoaderData, useNavigate } from 'react-router-dom';

import { getSearchParams } from '../../utils/searchParams.js';
import api from '../../utils/axiosInstance.js';
import { useFetch } from '../../hooks/useFetch.js';
import { showAlert } from '../../store/ui/alert-slice.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

import ResultDetails from '../../components/result/result-details/ResultDetails.jsx';
import Card from '../../components/app/card/Card.jsx';

const EditResult = () => {
    const routeData = useLoaderData();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { request, error, isLoading } = useFetch();

    const result = routeData.result; // Extract the result from the route data for easy reference
    const league = routeData.league; // Extract the league from the route data for easy reference

    const handleSaveResult = async (scores) => {
        // send the request
        const response = await request(
            `/results/${result.id}?leagueId=${league.id}`,
            'patch',
            {
                homeTeamScore: scores.homeScore,
                awayTeamScore: scores.awayScore,
            }
        );

        if (response) {
            // show a success alert
            dispatch(showAlert('success', 'Result updated successfully'));

            // navigate to the league page
            navigate(`/leagues/${league.id}`);
        }
    };

    return (
        <main className="center wrapper-spacing">
            <Card>
                <ResultDetails
                    result={result}
                    league={league}
                    error={error}
                    isLoading={isLoading}
                    onSave={handleSaveResult}
                />
            </Card>
        </main>
    );
};

export const editResultDataLoader = asyncHandler(async ({ request }) => {
    // get the league and result id from the request url
    const searchParams = getSearchParams(request);
    const resultId = searchParams.get('resultId');
    const leagueId = searchParams.get('leagueId');

    // Query to request for the league
    const leaguePromise = api.get(`/leagues/${leagueId}`);

    // Query to request for the result
    const resultPromise = api.get(`/results/${resultId}`);

    // Get the league and the result
    const [leagueResponse, resultResponse] = await Promise.all([
        leaguePromise,
        resultPromise,
    ]);

    return { league: leagueResponse.data, result: resultResponse.data };
});

export default EditResult;
