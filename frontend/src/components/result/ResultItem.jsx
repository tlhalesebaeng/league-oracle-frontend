import { NavLink } from 'react-router-dom';
import './ResultItem.css';

const ResultItem = ({ result }) => {
    return (
        <li className="result-list__item">
            <p className="result-list__date">{result.date}</p>
            <section>
                <NavLink>{result.homeTeam}</NavLink>
                <p>
                    <span>{result.homeScore}</span>
                    <span>{result.awayScore}</span>
                </p>
                <NavLink>{result.awayTeam}</NavLink>
            </section>
        </li>
    );
};

export default ResultItem;
