import { NavLink } from 'react-router-dom';
import './FixtureItem.css';

const FixtureItem = ({ homeTeam, awayTeam, date, time }) => {
    return (
        <li className="fixture-list__item">
            <p className="fixture-list__date">{date}</p>
            <section className="fixture-list__details">
                <NavLink>{homeTeam}</NavLink>
                <NavLink>versus</NavLink>
                <NavLink>{awayTeam}</NavLink>
            </section>
            <p className="fixture-list__time">{time}</p>
        </li>
    );
};

export default FixtureItem;
