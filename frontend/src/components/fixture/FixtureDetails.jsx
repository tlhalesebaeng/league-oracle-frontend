import { useNavigate, useRouteLoaderData } from 'react-router-dom';
import { useSelector } from 'react-redux';

import FixtureHeader from './FixtureHeader.jsx';
import FixtureTeams from './FixtureTeams.jsx';
import FixtureVenue from './FixtureVenue.jsx';
import Button from '../../utils/Button.jsx';
import './FixtureDetails.css';

const FixtureDetails = () => {
    const isAuth = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();
    const data = useRouteLoaderData('fixture-route');

    const { awayTeam, homeTeam, date, time, venue, field } = data.fixture;
    const league = {
        _id: data.fixture.league,
        creator: data.creator,
        name: data.name,
    };

    // check if the user is the league creator to be able to edit the fixture details
    const isCreator = league.creator === user._id;

    const handleAddResult = () => {
        navigate('/results/r2');
    };

    const handleSaveChanges = () => {};

    const handleCancelChanges = () => {};

    return (
        <main>
            <FixtureHeader
                league={league}
                fixtureDate={date || 'TBC'}
                fixtureTime={time || 'TBC'}
            />

            <FixtureTeams
                leagueId={league._id}
                homeTeam={homeTeam}
                awayTeam={awayTeam}
            />

            <FixtureVenue
                leagueCreator={league.creator}
                fixtureVenue={venue}
                fixtureField={field}
            />

            {isAuth && isCreator && (
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
            )}
        </main>
    );
};

export default FixtureDetails;
