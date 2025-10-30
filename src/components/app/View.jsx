import { useCallback, useMemo } from 'react';
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
    const activeTab = useSelector((state) => state.ui.tab); // The currently selected tab
    const dispatch = useDispatch();

    // Function ran when the results tab is clicked (Tablist component)
    const handleChangeTab = useCallback((tabName) => {
        dispatch(uiActions.setTab(tabName)); // Set the active tab to be the given tab name
    }, []);

    // List of all the tabs
    const tabList = useMemo(
        () => [
            { _id: 'tab-1', name: 'Standings' },
            { _id: 'tab-2', name: 'Fixtures' },
            { _id: 'tab-3', name: 'Results' },
        ],
        []
    );

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
                    onChangeTab={handleChangeTab}
                />
            </div>
            {component}
        </main>
    );
};

export default View;
