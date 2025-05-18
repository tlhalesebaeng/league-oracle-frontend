import { useLoaderData, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Button from '../../utils/Button.jsx';
import './StandingDetails.css';

const StandingDetails = ({ teamName }) => {
    const isAuth = useSelector((state) => state.auth.isAuthenticated);
    const navigate = useNavigate();
    const { league } = useLoaderData();

    const handleLeagueNameClick = () => {
        navigate({
            pathname: `/leagues/${league._id}`,
            search: '?/tab=standings',
        });
    };

    const handleEditLeague = () => {
        navigate('/leagues/edit');
    };

    return (
        <section className="league-details">
            <div className="header">
                <h2 onClick={handleLeagueNameClick}>{league.name}</h2>
                {/* will verify the league creator later */}
                {isAuth && (
                    <div className="btn-update">
                        <Button onClick={handleEditLeague} type="no-bg">
                            Edit
                        </Button>
                    </div>
                )}
            </div>
            {teamName && <h3>{teamName} page</h3>}
            {!teamName && <p>{'10-20-2020'}</p>}
        </section>
    );
};

export default StandingDetails;
