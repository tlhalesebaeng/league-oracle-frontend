import { useNavigate, useParams, useRouteLoaderData } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Button from '../../utils/Button.jsx';
import './StandingDetails.css';

const StandingDetails = () => {
    const isAuth = useSelector((state) => state.auth.isAuthenticated);
    const navigate = useNavigate();
    const { league } = useRouteLoaderData('league-route');
    const params = useParams();

    let team = null;
    if (params.teamId) {
        // we are looking at a team so we should show team details instead of league details
        const teams = league.teams;
        for (let i = 0; i < teams.length; i++) {
            // TODO: Improve this (linear) search algorithm
            if (teams[i]._id === params.teamId) {
                team = teams[i];
                break;
            }
        }
    }

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
            {team && <h3>{team.name} page</h3>}
            {!team && <p>{'10-20-2020'}</p>}
        </section>
    );
};

export default StandingDetails;
