import { NavLink } from 'react-router-dom';
import './FixtureItem.css';

const FixtureItem = ({ fixture }) => {
    return (
        <li className="fixture-list__item">
            <p className="fixture-list__date">{fixture.date}</p>
            <section className="fixture-list__details">
                <NavLink>{fixture.homeTeam}</NavLink>
                <NavLink>versus</NavLink>
                <NavLink>{fixture.awayTeam}</NavLink>
            </section>
            <p className="fixture-list__time">{fixture.time}</p>
        </li>
    );
};

export default FixtureItem;
