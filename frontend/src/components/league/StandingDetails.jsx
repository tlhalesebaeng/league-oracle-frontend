import { useNavigate } from 'react-router-dom';

import Button from '../../utils/Button.jsx';
import './StandingDetails.css';

const Details = ({ leagueName, dateCreated, teamName }) => {
    const navigate = useNavigate();

    const handleLeagueNameClick = () => {
        navigate('/leagues/l3', {
            state: { leagueName: 'My buff league', dateCreated: '10-04-2020' },
        });
    };

    const handleEditLeague = () => {
        navigate('/leagues/edit');
    };

    return (
        <section className="league-details">
            <div className="header">
                <h2 onClick={handleLeagueNameClick}>{leagueName}</h2>
                <div className="btn-update">
                    <Button onClick={handleEditLeague} type="no-bg">
                        Edit
                    </Button>
                </div>
            </div>
            {teamName && <h3>{teamName} page</h3>}
            {!teamName && <p>{dateCreated}</p>}
        </section>
    );
};

export default Details;
