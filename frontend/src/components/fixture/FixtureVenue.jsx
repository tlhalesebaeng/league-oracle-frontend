import { useSelector } from 'react-redux';
import EditField from '../app/EditField.jsx';
import './FixtureVenue.css';

const FixtureVenue = (venueDetails) => {
    const isAuth = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user);

    // Extract the venue details
    const details = venueDetails.venueDetails;

    // check if the user is the league creator to be able to edit the fixture venue and field
    const isCreator = details.leagueCreator === user._id;

    // allow editing the venue and field when the user is logged in and is the league creator
    let venue = null;
    let field = null;
    if (isAuth && isCreator) {
        venue = (
            <EditField
                onInputChange={(value) => details.onEdit('venue', value)}
                placeholder={details.fixtureVenue}
                value={details.venue}
            />
        );
        field = (
            <EditField
                onInputChange={(value) => details.onEdit('field', value)}
                placeholder={details.fixtureField}
                value={details.field}
            />
        );
    } else {
        console.log(details);
        console.log(details.fixtureVenue, details.fixtureField);
        venue = <p>{details.fixtureVenue}</p>;
        field = <p>{details.fixtureField}</p>;
    }

    return (
        <section className="fixture-venue">
            {venue}
            {field}
        </section>
    );
};

export default FixtureVenue;
