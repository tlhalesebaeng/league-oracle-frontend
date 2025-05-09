import LeagueItem from './LeagueItem';
import './LeagueList.css';

const LeagueList = ({ onClose }) => {
    // keep the list of all leagues in the redux store
    const leagues = [
        {
            id: 'l1',
            name: 'Tlhalefos League',
            created: '10-04-2025',
        },
        {
            id: 'l2',
            name: 'Sebaeng League',
            created: '07-09-2020',
        },
        {
            id: 'l3',
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
