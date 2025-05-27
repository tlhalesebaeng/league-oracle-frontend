import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TeamScore from '../team/TeamScore.jsx';
import Button from '../../utils/Button.jsx';
import './ResultDetails.css';

const ResultDetails = (props) => {
    const navigate = useNavigate();
    const [scores, setScores] = useState({
        homeScore: props.result.homeTeamScore,
        awayScore: props.result.awayTeamScore,
    });

    const { homeTeam, homeTeamScore, awayTeam, awayTeamScore } = props.result;

    const handleNameClick = () => {
        navigate(`/leagues/${props.league._id}`);
    };

    const handleCancelChanges = () => {
        navigate(`/leagues/${props.league._id}`);
    };

    const handleScoreChange = (field, value) => {
        setScores((prevScores) => {
            const newScores = { ...prevScores };
            newScores[field] = value;
            return newScores;
        });
    };

    // disable the save button if there are no changes in the scores
    let disableSave = false;
    if (
        homeTeamScore === scores.homeScore &&
        awayTeamScore === scores.awayTeam
    ) {
        disableSave = true;
    }

    // disable the save button if there is an empty score
    if (!scores.homeScore || !scores.awayScore) disableSave = true;

    return (
        <>
            <h2
                onClick={handleNameClick}
                className="result-details__league-name"
            >
                {props.league.name}
            </h2>
            <TeamScore
                leagueId={props.league._id}
                team={homeTeam}
                placeholder={homeTeamScore}
                score={scores.homeScore}
                onInputChange={(value) => handleScoreChange('homeScore', value)}
            />
            <TeamScore
                leagueId={props.league._id}
                team={awayTeam}
                placeholder={awayTeamScore}
                score={scores.awayScore}
                onInputChange={(value) => handleScoreChange('awayScore', value)}
            />
            <section className="result-details__buttons">
                <div className="result-details__btn-save">
                    <Button
                        disabled={props.isLoading || disableSave}
                        onClick={props.onSave}
                        type="save"
                    >
                        {props.isLoading ? 'Loading...' : 'Save'}
                    </Button>
                </div>
                <div className="result-details__btn-cancel">
                    <Button
                        onClick={() => handleCancelChanges(scores)}
                        type="cancel"
                    >
                        Cancel
                    </Button>
                </div>
            </section>
        </>
    );
};

export default ResultDetails;
