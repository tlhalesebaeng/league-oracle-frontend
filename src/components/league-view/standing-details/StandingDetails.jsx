import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useRouteLoaderData } from 'react-router-dom';

import { uiActions } from '../../../store/ui/ui-slice.js';

import Button from '../../app/button/Button.jsx';
import './StandingDetails.css';

const StandingDetails = memo(() => {
    const isAuth = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { league } = useRouteLoaderData('league-route');
    const params = useParams();

    let team = null;
    if (params.teamId) {
        // we are looking at a team so we should show team details instead of league details
        const teams = league.teams;
        for (let i = 0; i < teams.length; i++) {
            // TODO: Improve this (linear) search algorithm
            if (teams[i].id === parseInt(params.teamId)) {
                team = teams[i];
                break;
            }
        }
    }

    // Check whether the user is the league creator so that we can allow editting the league if so
    const isCreator = league.creator === user.id;

    // Function ran when the league name is clicked
    const handleLeagueNameClick = () => {
        // Change the tab to Standings
        dispatch(uiActions.setTab('Standings'));
    };

    // Function ran when the edit button is clicked
    const handleEditLeague = () => {
        navigate({
            pathname: '/leagues/edit',
            search: `?leagueId=${league.id}`,
        });
    };

    return (
        <section className="league-details">
            <div className="league-details__header">
                <h2 onClick={handleLeagueNameClick}>{league.name}</h2>
                {isAuth && isCreator && (
                    <div className="btn-update">
                        <Button onClick={handleEditLeague} type="no-bg">
                            Edit
                        </Button>
                    </div>
                )}
            </div>
            {team && <h3>{team.name} page</h3>}
            {!team && <p>{league.createdAt || '10-20-2020'}</p>}
        </section>
    );
});

export default StandingDetails;
