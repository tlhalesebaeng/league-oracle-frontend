import { memo } from 'react';
import { Link } from 'react-router-dom';
import './FixtureTeams.css';

const FixtureTeams = memo(({ leagueId, homeTeam, awayTeam }) => {
    return (
        <section className="fixture-teams">
            <Link to={`/leagues/${leagueId}/teams/${homeTeam.id}`}>
                {homeTeam.name}
            </Link>
            <p>versus</p>
            <Link to={`/leagues/${leagueId}/teams/${awayTeam.id}`}>
                {awayTeam.name}
            </Link>
        </section>
    );
});

export default FixtureTeams;
