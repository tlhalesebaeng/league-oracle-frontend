import './TabList.css';

const TabList = ({ onStandings, onFixtures, onResults, tab }) => {
    return (
        <ul className="tab-list">
            <li
                className={tab === 'standings' ? 'active' : undefined}
                onClick={onStandings}
            >
                Standings
            </li>
            <li
                className={tab === 'fixtures' ? 'active' : undefined}
                onClick={onFixtures}
            >
                Fixtures
            </li>
            <li
                className={tab === 'results' ? 'active' : undefined}
                onClick={onResults}
            >
                Results
            </li>
        </ul>
    );
};

export default TabList;
