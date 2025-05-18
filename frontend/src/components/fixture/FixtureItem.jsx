import { Link } from 'react-router-dom';
import './FixtureItem.css';

const FixtureItem = ({ fixture }) => {
    const { homeTeam, awayTeam, date, time } = fixture;
    return (
        <li className="fixture-list__item">
            <p className="fixture-list__date">{date || 'TBC'}</p>
            <section className="fixture-list__details">
                <Link to={`/teams/${homeTeam._id}`}>{homeTeam.name}</Link>
                <Link className="fixture-list__versus" to="/fixtures/f1">
                    versus
                </Link>
                <Link to={`/teams/${awayTeam._id}`}>{awayTeam.name}</Link>
            </section>
            <p className="fixture-list__time">{time || 'TBC'}</p>
        </li>
    );
};

export default FixtureItem;
