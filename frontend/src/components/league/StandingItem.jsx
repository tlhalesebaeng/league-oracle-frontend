import { Link } from 'react-router-dom';
import StandingField from './StandingField.jsx';
import './StandingItem.css';

const Standing = ({
    id,
    name,
    wins,
    draws,
    loses,
    goalsFoward,
    goalsAgainst,
    playedGames,
    points,
    goalDifference,
}) => {
    return (
        <tr className="league-standings__row">
            <StandingField>1</StandingField>
            <StandingField className="league-standings__heading-field">
                <Link to={`/teams/${id}`} state={name}>
                    {name}
                </Link>
            </StandingField>
            <StandingField>{playedGames}</StandingField>
            <StandingField>{wins}</StandingField>
            <StandingField>{draws}</StandingField>
            <StandingField>{loses}</StandingField>
            <StandingField>{goalsFoward}</StandingField>
            <StandingField>{goalsAgainst}</StandingField>
            <StandingField>{goalDifference}</StandingField>
            <StandingField className="league-standings__points-field">
                {points}
            </StandingField>
        </tr>
    );
};

export default Standing;
