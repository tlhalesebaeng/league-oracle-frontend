import { NavLink, useNavigate, useRouteLoaderData } from 'react-router-dom';
import Button from '../../utils/Button.jsx';
import './ResultItem.css';

const ResultItem = ({ result, onEdit, isCreator, isAuth }) => {
    // this component is rendered in a list so to improve performace accessing state
    // and function definitions are put in the component that renders this component
    const { _id, homeTeam, homeTeamScore, awayTeam, awayTeamScore, date } =
        result;

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
            {isAuth && isCreator && (
                <section className="result-list__edit-btn">
                    <Button onClick={() => onEdit(_id)} type="no-bg">
                        Edit
                    </Button>
                </section>
            )}
        </li>
    );
};

export default ResultItem;
