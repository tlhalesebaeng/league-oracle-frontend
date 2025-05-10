import TabItem from './TabItem';
import './TabList.css';

const TabList = ({ onStandings, onFixtures, onResults, tab }) => {
    const determineHandler = (tabName) => {
        if (tabName === 'standings') return onStandings;
        else if (tabName === 'fixtures') return onFixtures;
        else if (tabName === 'results') return onResults;
    };

    const tabs = ['Standings', 'Fixtures', 'Results'];
    return (
        <ul className="tab-list">
            {tabs.map((tabName) => {
                const lowercaseTabName = tabName.toLowerCase();
                const style = tab === lowercaseTabName ? 'active' : undefined;
                const click = determineHandler(lowercaseTabName);

                return (
                    <TabItem onClick={click} className={style} key={tabName}>
                        {tabName}
                    </TabItem>
                );
            })}
        </ul>
    );
};

export default TabList;
