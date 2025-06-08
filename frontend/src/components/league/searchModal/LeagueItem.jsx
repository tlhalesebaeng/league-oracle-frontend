import './LeagueItem.css';

const LeagueItem = ({ name, dateCreated, onShowLeague }) => {
    return (
        <li onClick={onShowLeague} className="league-list__item">
            <p>{name}</p>
            <p>{dateCreated}</p>
        </li>
    );
};

export default LeagueItem;
