import { useNavigate } from 'react-router-dom';
import './FixtureDetails.css';
import FixtureHeader from './FixtureHeader';
import FixtureTeams from './FixtureTeams';
import FixtureVenue from './FixtureVenue';
import Button from '../../utils/Button';

const FixtureDetails = ({ league, leagueFixture }) => {
    const navigate = useNavigate();

    const { awayTeam, homeTeam } = leagueFixture;

    const handleAddResult = () => {
        navigate('/results/r2');
    };
    const handleSaveChanges = () => {};
    const handleCancelChanges = () => {};

    return (
        <main>
            <FixtureHeader
                league={league}
                fixtureDate={leagueFixture.date}
                fixtureTime={leagueFixture.time}
            />

            <FixtureTeams homeTeam={homeTeam} awayTeam={awayTeam} />

            <FixtureVenue
                fixtureVenue={leagueFixture.venue}
                fixtureField={leagueFixture.field}
            />
            <section className="fixture-details__buttons">
                <div className="fixture-details__btn-add">
                    <Button onClick={handleAddResult}>Add result</Button>
                </div>
                <div className="fixture-details__btn-save">
                    <Button onClick={handleSaveChanges}>Save</Button>
                </div>
                <div className="fixture-details__btn-cancel">
                    <Button onClick={handleCancelChanges} type="no-bg">
                        Cancel
                    </Button>
                </div>
            </section>
        </main>
    );
};

export default FixtureDetails;
