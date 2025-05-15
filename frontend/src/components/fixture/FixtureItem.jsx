import { Link } from 'react-router-dom';
import './FixtureItem.css';

const FixtureItem = ({ homeTeam, awayTeam, date, time }) => {
    return (
        <li className="fixture-list__item">
            <p className="fixture-list__date">{date}</p>
            <section className="fixture-list__details">
                <Link to="/teams/t1">{homeTeam}</Link>
                <Link className="fixture-list__versus" to="/fixtures/f1">
                    versus
                </Link>
                <Link to="/teams/t2">{awayTeam}</Link>
            </section>
            <p className="fixture-list__time">{time}</p>
        </li>
    );
};

export default FixtureItem;
