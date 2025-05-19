import LeagueItem from './LeagueItem.jsx';
import './LeagueList.css';

const LeagueList = ({ onClose }) => {
    // keep the list of all leagues in the redux store
    const leagues = [
        {
            id: '6810de853c7623120c8a1b20',
            name: 'Tlhalefos League',
            created: '10-04-2025',
        },
        {
            id: '6811247715cd9def4c25913c',
            name: 'Sebaeng League',
            created: '07-09-2020',
        },
        {
            id: '6829982b04d94bb16f3a787c',
            name: 'Kagiso League',
            created: '20-01-2024',
        },
    ];
    return (
        <ul className="league-list">
            {leagues.map((league) => (
                <LeagueItem
                    key={league.id}
                    id={league.id}
                    name={league.name}
                    dateCreated={league.created}
                />
            ))}
        </ul>
    );
};

export default LeagueList;
