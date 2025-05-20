import { useNavigate, useRouteLoaderData } from 'react-router-dom';
import Card from '../app/Card.jsx';
import TeamScore from './TeamScore.jsx';
import Button from '../../utils/Button.jsx';
import './ResultDetails.css';

const ResultDetails = () => {
    const { result, name } = useRouteLoaderData('result-route');
    const navigate = useNavigate();

    const { homeTeam, homeTeamScore, awayTeam, awayTeamScore } = result;

    const handleNameClick = () => {
        navigate(`/leagues/${result.league}`);
    };

    return (
        <Card>
            <h2
                onClick={handleNameClick}
                className="result-details__league-name"
            >
                {name}
            </h2>
            <TeamScore team={homeTeam} teamScore={homeTeamScore} />
            <TeamScore team={awayTeam} teamScore={awayTeamScore} />
            <section className="result-details__buttons">
                <div className="result-details__btn-save">
                    <Button type="save">Save</Button>
                </div>
                <div className="result-details__btn-cancel">
                    <Button type="cancel">Cancel</Button>
                </div>
            </section>
        </Card>
    );
};

export default ResultDetails;
