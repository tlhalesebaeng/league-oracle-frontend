import { memo } from 'react';
import { useSelector } from 'react-redux';
import EditField from '../../../components/app/edit-field/EditField.jsx';
import './FixtureVenue.css';

const FixtureVenue = memo((venueDetails) => {
    const isAuth = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user);

    // Extract the venue details
    const details = venueDetails.venueDetails;

    // check if the user is the league creator to be able to edit the fixture venue and field
    const isCreator = details.leagueCreator === user.id;

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
        venue = <p>{details.fixtureVenue}</p>;
        field = <p>{details.fixtureField}</p>;
    }

    return (
        <section className="fixture-venue">
            {venue}
            {field}
        </section>
    );
});

export default FixtureVenue;
