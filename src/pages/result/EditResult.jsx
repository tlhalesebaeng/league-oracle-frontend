import { useDispatch } from 'react-redux';
import { useLoaderData, useNavigate } from 'react-router-dom';

import { getSearchParams } from '../../utils/functions/searchParams.js';
import api from '../../utils/functions/axiosInstance.js';
import { useFetch } from '../../hooks/useFetch.js';
import { showAlert } from '../../store/ui/alert-slice.js';
import { asyncHandler } from '../../utils/functions/asyncHandler.js';

import ResultDetails from '../../components/result/ResultDetails.jsx';
import Card from '../../components/app/Card.jsx';

const EditResult = () => {
    const routeData = useLoaderData();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { request, error, isLoading } = useFetch();

    const result = routeData.result;
    const league = { id: result.league, name: routeData.name };

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
        <main>
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

    // get the result
    const response = await api.get(`/results/${resultId}`, {
        params: {
            leagueId,
        },
    });

    return response.data;
});

export default EditResult;
