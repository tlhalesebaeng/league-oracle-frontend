import './LeagueItem.css';

const LeagueItem = ({ id, name, dateCreated }) => {
    return (
        <li className="league-list__item">
            <p>{name}</p>
            <p>{dateCreated}</p>
        </li>
    );
};

export default LeagueItem;
