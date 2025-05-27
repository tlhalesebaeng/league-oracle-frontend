import { useLoaderData } from 'react-router-dom';
import { getSearchParams } from '../../utils/functions/searchParams.js';
import api from '../../utils/functions/axiosInstance.js';
import ResultDetails from '../../components/result/ResultDetails.jsx';
import Card from '../../components/app/Card.jsx';

const AddResult = () => {
    const routeData = useLoaderData();

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

    const handleAddResult = (scores) => {};

    return (
        <main>
            <Card>
                <ResultDetails
                    result={result}
                    league={league}
                    onSave={handleAddResult}
                />
            </Card>
        </main>
    );
};

export default AddResult;

export const addResultDataLoader = async ({ request }) => {
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

    // TODO: Handle errors of this request

    return response.data;
};
