import { useNavigate } from 'react-router-dom';
import EditField from '../app/EditField';
import './FixtureHeader.css';

const FixtureHeader = ({ league, fixtureDate, fixtureTime }) => {
    const navigate = useNavigate();
    return (
        <section className="fixture-header">
            <div className="fixture-header__container">
                <h2 onClick={() => navigate(`/leagues/${league.id}`)}>
                    {league.name}
                </h2>
                <p>
                    <EditField tag="span" name={fixtureDate} />|
                    <EditField tag="span" name={fixtureTime} />
                </p>
            </div>
        </section>
    );
};

export default FixtureHeader;
