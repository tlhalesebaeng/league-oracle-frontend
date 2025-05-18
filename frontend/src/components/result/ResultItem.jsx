import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '../../utils/Button.jsx';
import './ResultItem.css';

const ResultItem = ({ result }) => {
    const isAuth = useSelector((state) => state.auth.isAuthenticated);
    const navigate = useNavigate();

    const { id, homeTeam, homeTeamScore, awayTeam, awayTeamScore, date } =
        result;

    const handleEditResult = () => {
        navigate(`/results/${id}`);
    };

    return (
        <li className="result-list__item">
            <p className="result-list__date">{date || 'TBC'}</p>
            <section className="result-list__teams">
                <NavLink>{homeTeam.name}</NavLink>
                <p>
                    <span>{homeTeamScore}</span>
                    <span>{awayTeamScore}</span>
                </p>
                <NavLink>{awayTeam.name}</NavLink>
            </section>
            {/* will verify the league creator later */}
            {isAuth && (
                <section className="result-list__edit-btn">
                    <Button onClick={handleEditResult} type="no-bg">
                        Edit
                    </Button>
                </section>
            )}
        </li>
    );
};

export default ResultItem;
