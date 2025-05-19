import { useSelector } from 'react-redux';
import EditField from '../app/EditField.jsx';
import './FixtureVenue.css';

const FixtureVenue = ({ leagueCreator, fixtureVenue, fixtureField }) => {
    const isAuth = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user);

    // check if the user is the league creator to be able to edit the fixture venue and field
    const isCreator = leagueCreator === user._id;

    // allow editing the venue and field when the user is logged in and is the league creator
    let venue = null;
    let field = null;
    if (isAuth && isCreator) {
        venue = <EditField name={fixtureVenue} />;
        field = <EditField name={fixtureField} />;
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
