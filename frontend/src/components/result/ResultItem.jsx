import { NavLink } from 'react-router-dom';
import './ResultItem.css';

const ResultItem = ({ homeTeam, homeScore, awayScore, awayTeam, date }) => {
    return (
        <li className="result-list__item">
            <p className="result-list__date">{date}</p>
            <section>
                <NavLink>{homeTeam}</NavLink>
                <p>
                    <span>{homeScore}</span>
                    <span>{awayScore}</span>
                </p>
                <NavLink>{awayTeam}</NavLink>
            </section>
        </li>
    );
};

export default ResultItem;
