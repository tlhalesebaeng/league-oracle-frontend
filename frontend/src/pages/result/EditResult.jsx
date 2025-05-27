import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { getSearchParams } from '../../utils/functions/searchParams.js';
import api from '../../utils/functions/axiosInstance.js';
import ResultDetails from '../../components/result/ResultDetails.jsx';
import Card from '../../components/app/Card.jsx';

const EditResult = () => {
    const routeData = useLoaderData();

    const result = routeData.result;
    const league = { _id: result.league, name: routeData.name };

    const handleSaveResult = (scores) => {};

    return (
        <main>
            <Card>
                <ResultDetails
                    result={result}
                    league={league}
                    onSave={handleSaveResult}
                />
            </Card>
        </main>
    );
};

export const editResultDataLoader = async ({ request }) => {
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

    // TODO: Handle errors of this request

    return response.data;
};

export default EditResult;
