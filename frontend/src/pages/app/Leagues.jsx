import { useState } from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';

import Details from '../../components/league/Details.jsx';
import Standings from '../../components/league/Standings.jsx';
import FixtureList from '../../components/fixture/FixtureList.jsx';
import TabList from '../../components/tab/TabList.jsx';
import ResultList from '../../components/result/ResultList.jsx';

const Leagues = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const params = useParams();
    const initialTab = searchParams.get('tab');
    const location = useLocation();
    const [tab, setTab] = useState(initialTab || 'standings');

    const handleStandingsTab = () => {
        setTab('standings');
    };
    const handleFixturesTab = () => {
        setTab('fixtures');
    };
    const handleResultsTab = () => {
        setTab('results');
    };

    const tabHandlers = {
        onStandings: handleStandingsTab,
        onFixtures: handleFixturesTab,
        onResults: handleResultsTab,
    };

    return (
        <main>
            <div style={{ minWidth: '320px', width: '35%' }}>
                <Details {...location.state} />
                <TabList tab={tab} {...tabHandlers} />
            </div>
            {tab === 'standings' && <Standings />}
            {tab === 'fixtures' && <FixtureList />}
            {tab === 'results' && <ResultList />}
        </main>
    );
};

export default Leagues;
