import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { uiActions } from '../../../store/ui/ui-slice.js';

import StandingDetails from '../standing-details/StandingDetails.jsx';
import Standings from '../standings/Standings.jsx';
import FixtureList from '../fixture-list/FixtureList.jsx';
import TabList from '../tab-list/TabList.jsx';
import ResultList from '../result-list/ResultList.jsx';
import './View.css';

// This is a shared component for standings, fixtures and results
const View = () => {
    const activeTab = useSelector((state) => state.ui.tab); // The currently selected tab
    const dispatch = useDispatch();

    // Function ran when the results tab is clicked (Tablist component)
    const handleChangeTab = useCallback((tabName) => {
        dispatch(uiActions.setTab(tabName)); // Set the active tab to be the given tab name
    }, []);

    // List of all the tabs
    const tabList = useMemo(
        () => [
            { id: 'tab-1', name: 'Standings' },
            { id: 'tab-2', name: 'Fixtures' },
            { id: 'tab-3', name: 'Results' },
        ],
        []
    );

    // Determine which component to show based on the active tab
    let component = null;
    if (activeTab === 'Standings') component = <Standings />;
    else if (activeTab === 'Fixtures') component = <FixtureList />;
    else component = <ResultList />;

    return (
        <main className="center wrapper-spacing column">
            <div className="column">
                <StandingDetails />
                <TabList
                    activeTab={activeTab}
                    tabList={tabList}
                    onChangeTab={handleChangeTab}
                />
            </div>
            {component}
        </main>
    );
};

export default View;
