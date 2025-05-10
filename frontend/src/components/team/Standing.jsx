import './Standing.css';
import StandingField from './StandingField';

const Standing = ({
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
                {name}
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
