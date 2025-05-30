import LeagueItem from './LeagueItem.jsx';
import './LeagueList.css';

const LeagueList = ({ leagues }) => {
    return (
        <ul className="league-list">
            {leagues.map((league) => (
                <LeagueItem
                    key={league._id}
                    id={league._id}
                    name={league.name}
                    dateCreated={league.created}
                />
            ))}
        </ul>
    );
};

export default LeagueList;
