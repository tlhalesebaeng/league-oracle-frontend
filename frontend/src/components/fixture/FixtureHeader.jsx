import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import EditField from '../app/EditField.jsx';
import './FixtureHeader.css';

const FixtureHeader = ({ league, fixtureDate, fixtureTime }) => {
    const isAuth = useSelector((state) => state.auth.isAuthenticated);
    const navigate = useNavigate();

    // allow editing the date and time when we're logged in (will check for league creator later)
    let paragraph = <p></p>;
    if (isAuth) {
        paragraph = (
            <p>
                <EditField tag="span" name={fixtureDate} />|
                <EditField tag="span" name={fixtureTime} />
            </p>
        );
    } else {
        paragraph = (
            <p>
                <span>{fixtureDate}</span> | <span>{fixtureTime}</span>
            </p>
        );
    }

    return (
        <section className="fixture-header">
            <div className="fixture-header__container">
                <h2 onClick={() => navigate(`/leagues/${league.id}`)}>
                    {league.name}
                </h2>
                {paragraph}
            </div>
        </section>
    );
};

export default FixtureHeader;
