import { useNavigate } from 'react-router-dom';
import Card from '../app/Card.jsx';
import TeamScore from './TeamScore.jsx';
import Button from '../../utils/Button.jsx';
import './ResultDetails.css';

const ResultDetails = ({ result }) => {
    const navigate = useNavigate();
    const { id, homeTeam, homeScore, awayTeam, awayScore } = result;
    const handleNameClick = () => {
        navigate(`/leagues/l3`);
    };
    return (
        <Card>
            <h2
                onClick={handleNameClick}
                className="result-details__league-name"
            >
                Most massive league
            </h2>
            <TeamScore teamName={homeTeam} teamScore={homeScore} />
            <TeamScore teamName={awayTeam} teamScore={awayScore} />
            <section className="result-details__buttons">
                <div className="result-details__btn-save">
                    <Button>Save</Button>
                </div>
                <div className="result-details__btn-cancel">
                    <Button type="no-bg">Cancel</Button>
                </div>
            </section>
        </Card>
    );
};

export default ResultDetails;
