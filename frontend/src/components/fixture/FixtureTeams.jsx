import { Link } from 'react-router-dom';
import './FixtureTeams.css';

const FixtureTeams = ({ homeTeam, awayTeam }) => {
    return (
        <section className="fixture-teams">
            <Link to={`/teams/${homeTeam.id}`}>{homeTeam.name}</Link>
            <p>versus</p>
            <Link to={`/teams/${awayTeam.id}`}>{awayTeam.name}</Link>
        </section>
    );
};

export default FixtureTeams;
