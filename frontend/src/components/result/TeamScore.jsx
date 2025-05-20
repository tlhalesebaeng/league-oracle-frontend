import { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../utils/Input';
import './TeamScore.css';

const TeamScore = ({ team, teamScore, leagueId }) => {
    const [score, setScore] = useState(teamScore);

    const handleInputChange = (value) => {
        setScore(value);
    };

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
                onInputChange={(event) => handleInputChange(event.target.value)}
                placeholder={teamScore}
                value={score}
            />
        </section>
    );
};

export default TeamScore;
