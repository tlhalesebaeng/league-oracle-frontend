import { NavLink, useNavigate } from 'react-router-dom';
import Button from '../../utils/Button.jsx';
import './ResultItem.css';

const ResultItem = ({ result }) => {
    const { id, homeTeam, homeScore, awayScore, awayTeam, date } = result;
    const navigate = useNavigate();

    const handleEditResult = () => {
        navigate(`/results/${id}`);
    };

    return (
        <li className="result-list__item">
            <p className="result-list__date">{date}</p>
            <section className="result-list__teams">
                <NavLink>{homeTeam}</NavLink>
                <p>
                    <span>{homeScore}</span>
                    <span>{awayScore}</span>
                </p>
                <NavLink>{awayTeam}</NavLink>
            </section>
            <section className="result-list__edit-btn">
                <Button onClick={handleEditResult} type="no-bg">
                    Edit
                </Button>
            </section>
        </li>
    );
};

export default ResultItem;
