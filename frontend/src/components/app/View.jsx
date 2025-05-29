import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/ui/ui-slice.js';
import StandingDetails from '../league/StandingDetails.jsx';
import Standings from '../league/Standings.jsx';
import FixtureList from '../fixture/FixtureList.jsx';
import TabList from '../tab/TabList.jsx';
import ResultList from '../result/ResultList.jsx';
import './View.css';

// This is a shared component for standings, fixtures and results
const View = () => {
    const tab = useSelector((state) => state.ui.tab);
    const dispatch = useDispatch();

    const handleStandingsTab = () => {
        dispatch(uiActions.setTab('standings'));
    };

    const handleFixturesTab = () => {
        dispatch(uiActions.setTab('fixtures'));
    };

    const handleResultsTab = () => {
        dispatch(uiActions.setTab('results'));
    };

    const tabHandlers = {
        onStandings: handleStandingsTab,
        onFixtures: handleFixturesTab,
        onResults: handleResultsTab,
    };

    return (
        <main>
            <div className="view__header">
                <StandingDetails />
                <TabList tab={tab} {...tabHandlers} />
            </div>
            {tab === 'standings' && <Standings />}
            {tab === 'fixtures' && <FixtureList />}
            {tab === 'results' && <ResultList />}
        </main>
    );
};

export default View;
