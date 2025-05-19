import { Link } from 'react-router-dom';
import './FixtureTeams.css';

const FixtureTeams = ({ leagueId, homeTeam, awayTeam }) => {
    return (
        <section className="fixture-teams">
            <Link to={`/leagues/${leagueId}/teams/${homeTeam._id}`}>
                {homeTeam.name}
            </Link>
            <p>versus</p>
            <Link to={`/leagues/${leagueId}/teams/${awayTeam._id}`}>
                {awayTeam.name}
            </Link>
        </section>
    );
};

export default FixtureTeams;
