import { Link } from 'react-router-dom';
import Input from '../../app/input/Input';
import './TeamScore.css';

const TeamScore = ({ score, team, leagueId, onInputChange, placeholder }) => {
    return (
        <section className="team-score">
            <Link
                to={{
                    pathname: `/leagues/${leagueId}/teams/${team.id}`,
                }}
            >
                {team.name}{' '}
            </Link>
            <p>:</p>
            <Input
                onInputChange={(event) => onInputChange(event.target.value)}
                placeholder={placeholder}
                value={score}
            />
        </section>
    );
};

export default TeamScore;
