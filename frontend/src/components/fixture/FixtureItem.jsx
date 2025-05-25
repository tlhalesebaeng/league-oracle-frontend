import { Link } from 'react-router-dom';
import './FixtureItem.css';

const FixtureItem = ({ leagueId, fixture }) => {
    const { _id, homeTeam, awayTeam, formattedDate, time } = fixture;
    return (
        <li className="fixture-list__item">
            <p className="fixture-list__date">{formattedDate || 'TBC'}</p>
            <section className="fixture-list__details">
                <Link to={`/teams/${homeTeam._id}`}>{homeTeam.name}</Link>
                <Link
                    className="fixture-list__versus"
                    to={{
                        pathname: `/fixtures/${_id}`,
                        search: `?leagueId=${leagueId}`,
                    }}
                >
                    versus
                </Link>
                <Link to={`/teams/${awayTeam._id}`}>{awayTeam.name}</Link>
            </section>
            <p className="fixture-list__time">{time || 'TBC'}</p>
        </li>
    );
};

export default FixtureItem;
