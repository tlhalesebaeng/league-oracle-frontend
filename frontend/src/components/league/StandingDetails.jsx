import { useNavigate } from 'react-router-dom';
import './StandingDetails.css';

const Details = ({ leagueName, dateCreated, teamName }) => {
    const navigate = useNavigate();

    const handleLeagueNameClick = () => {
        navigate('/leagues/l3', {
            state: { leagueName: 'My buff league', dateCreated: '10-04-2020' },
        });
    };

    return (
        <section className="league-details">
            <h2 onClick={handleLeagueNameClick}>{leagueName}</h2>
            {teamName && <h3>{teamName} page</h3>}
            {!teamName && <p>{dateCreated}</p>}
        </section>
    );
};

export default Details;
