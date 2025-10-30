import { Link } from 'react-router-dom';
import Button from '../../utils/Button.jsx';
import './ResultItem.css';

const ResultItem = ({ result, onEdit, isCreator, isAuth }) => {
    // this component is rendered in a list so to improve performace accessing state
    // and function definitions are put in the component that renders this component
    return (
        <li className="result-list__item">
            <p className="result-list__date">{result.formattedDate || 'TBC'}</p>
            <section className="result-list__teams">
                <Link
                    to={`/leagues/${result.league}/teams/${result.homeTeam._id}`}
                >
                    {result.homeTeam.name}
                </Link>
                <p>
                    <span>{result.homeTeamScore}</span>
                    <span>{result.awayTeamScore}</span>
                </p>
                <Link
                    to={`/leagues/${result.league}/teams/${result.awayTeam._id}`}
                >
                    {result.awayTeam.name}
                </Link>
            </section>
            {isAuth && isCreator && (
                <section className="result-list__edit-btn">
                    <Button onClick={() => onEdit(result._id)} type="no-bg">
                        Edit
                    </Button>
                </section>
            )}
        </li>
    );
};

export default ResultItem;
