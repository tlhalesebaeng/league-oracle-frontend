import { useDispatch } from 'react-redux';
import { useLoaderData, useNavigate } from 'react-router-dom';

import { getSearchParams } from '../../utils/functions/searchParams.js';
import api from '../../utils/functions/axiosInstance.js';
import { useFetch } from '../../hooks/useFetch.js';
import { showAlert } from '../../store/ui/alert-slice.js';
import { asyncHandler } from '../../utils/functions/asyncHandler.js';

import ResultDetails from '../../components/result/ResultDetails.jsx';
import Card from '../../components/app/Card.jsx';

const AddResult = () => {
    const routeData = useLoaderData();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { request, error, isLoading } = useFetch();

    const fixture = routeData.fixture;
    // construct the result object from the fixture as needed by the result details component
    const result = {
        homeTeam: fixture.homeTeam,
        awayTeam: fixture.awayTeam,
        homeTeamScore: '', // set this two to open strings since we are adding a new result
        awayTeamScore: '',
    };

    // construct the league object
    const league = { _id: fixture.league, name: routeData.name };

    const handleAddResult = async (scores) => {
        // convert fields to integers and use properties that the backend expects
        const data = {
            homeTeamScore: parseInt(scores.homeScore),
            awayTeamScore: parseInt(scores.awayScore),
        };

        // send the request
        const response = await request(
            `/results?fixtureId=${fixture._id}&leagueId=${league._id}`,
            'post',
            data
        );

        if (response) {
            // navigate to the leagues page
            navigate(`/leagues/${league._id}`);

            // show the success alert
            dispatch(showAlert('success', 'Result successfully added'));
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
                    onSave={handleAddResult}
                />
            </Card>
        </main>
    );
};

export default AddResult;

export const addResultDataLoader = asyncHandler(async ({ request }) => {
    // get the league and fixture id from the request url (fixture is the fixture to which we want to add result for)
    const searchParams = getSearchParams(request);
    const leagueId = searchParams.get('leagueId');
    const fixtureId = searchParams.get('fixtureId');

    // send the request
    const response = await api.get(`/fixtures/${fixtureId}`, {
        params: {
            leagueId,
        },
    });

    return response.data;
});
