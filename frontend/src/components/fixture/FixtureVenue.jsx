import { useSelector } from 'react-redux';
import EditField from '../app/EditField.jsx';
import './FixtureVenue.css';

const FixtureVenue = (props) => {
    const isAuth = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user);

    // get the data in this way to make code readable
    const { leagueCreator, fixtureVenue, fixtureField, onEdit, editData } =
        props;

    // check if the user is the league creator to be able to edit the fixture venue and field
    const isCreator = leagueCreator === user._id;

    // allow editing the venue and field when the user is logged in and is the league creator
    let venue = null;
    let field = null;
    if (isAuth && isCreator) {
        venue = (
            <EditField
                onInputChange={(value) => onEdit('venue', value)}
                placeholder={fixtureVenue}
                value={editData.venue}
            />
        );
        field = (
            <EditField
                onInputChange={(value) => onEdit('field', value)}
                placeholder={fixtureField}
                value={editData.field}
            />
        );
    } else {
        venue = <p>{fixtureVenue}</p>;
        field = <p>{fixtureField}</p>;
    }

    return (
        <section className="fixture-venue">
            {venue}
            {field}
        </section>
    );
};

export default FixtureVenue;
