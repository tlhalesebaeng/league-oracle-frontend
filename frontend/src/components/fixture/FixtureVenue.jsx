import { useSelector } from 'react-redux';
import EditField from '../app/EditField.jsx';
import './FixtureVenue.css';

const FixtureVenue = ({ fixtureVenue, fixtureField }) => {
    const isAuth = useSelector((state) => state.auth.isAuthenticated);

    // allow editing the venue and field when we're logged in (will check for league creator later)
    let venue = <></>;
    let field = <></>;
    if (isAuth) {
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
