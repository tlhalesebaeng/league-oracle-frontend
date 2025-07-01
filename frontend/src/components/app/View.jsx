import { useSelector } from 'react-redux';

import StandingDetails from '../league/StandingDetails.jsx';
import Standings from '../league/Standings.jsx';
import FixtureList from '../fixture/FixtureList.jsx';
import TabList from '../tab/TabList.jsx';
import ResultList from '../result/ResultList.jsx';
import './View.css';

// This is a shared component for standings, fixtures and results
const View = ({ tabList, onChangeTab }) => {
    const activeTab = useSelector((state) => state.ui.tab); // The currently selected tab

    // Determine which component to show based on the active tab
    let component = null;
    if (activeTab === 'Standings') component = <Standings />;
    else if (activeTab === 'Fixtures') component = <FixtureList />;
    else component = <ResultList />;

    return (
        <main>
            <div className="view__header">
                <StandingDetails />
                <TabList
                    activeTab={activeTab}
                    tabList={tabList}
                    onChangeTab={onChangeTab}
                />
            </div>
            {component}
        </main>
    );
};

export default View;
