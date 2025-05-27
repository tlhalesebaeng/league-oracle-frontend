import { Link } from 'react-router-dom';
import Input from '../../utils/Input';
import './TeamScore.css';

const TeamScore = ({ score, team, leagueId, onInputChange }) => {
    return (
        <section className="team-score">
            <Link
                to={{
                    pathname: `/leagues/${leagueId}/teams/${team._id}`,
                }}
            >
                {team.name}{' '}
            </Link>
            <p>:</p>
            <Input
                onInputChange={(event) => onInputChange(event.target.value)}
                placeholder={score}
                value={score}
            />
        </section>
    );
};

export default TeamScore;
