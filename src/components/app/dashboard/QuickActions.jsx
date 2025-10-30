import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { uiActions } from '../../../store/ui/ui-slice.js';

import Card from '../Card.jsx';
import plusImg from '../../../assets/plus-blue.png';
import searchImg from '../../../assets/search-blue.png';
import './QuickActions.css';

const QuickActions = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Function that handles search leagues quick action
    const handleSearchLeagues = () => {
        // Show the search leagues modal
        dispatch(uiActions.showLeaguesModal());
    };

    const quickActions = [
        {
            _id: 'action1',
            imageSrc: plusImg,
            action: 'Create League',
            onClick: () => navigate('/leagues/create'),
        },
        {
            _id: 'action2',
            imageSrc: searchImg,
            action: 'Search Leagues',
            onClick: handleSearchLeagues,
        },
    ];

    return (
        <Card className="dashboard-details__actions">
            <div>
                <h3>Quick Actions</h3>
                <ul>
                    {quickActions.map((quickAction) => (
                        <li onClick={quickAction.onClick} key={quickAction._id}>
                            <img src={quickAction.imageSrc} />
                            <p>{quickAction.action}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </Card>
    );
};

export default QuickActions;
