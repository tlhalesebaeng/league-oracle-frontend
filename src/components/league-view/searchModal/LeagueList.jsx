import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { uiActions } from '../../../store/ui/ui-slice.js';
import LeagueItem from './LeagueItem.jsx';
import './LeagueList.css';

const LeagueList = ({ leagues }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleShowLeague = (id) => {
        dispatch(uiActions.hideLeaguesModal());
        navigate(`/leagues/${id}`);
    };

    return (
        <ul className="league-list">
            {leagues.map((league) => (
                <LeagueItem
                    key={league.id}
                    name={league.name}
                    dateCreated={league.created}
                    onShowLeague={() => handleShowLeague(league.id)}
                />
            ))}
        </ul>
    );
};

export default LeagueList;
