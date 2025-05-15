import EditField from '../app/EditField';
import './FixtureVenue.css';

const FixtureVenue = ({ fixtureVenue, fixtureField }) => {
    return (
        <section className="fixture-venue">
            <EditField name={fixtureVenue} />
            <EditField name={fixtureField} />
        </section>
    );
};

export default FixtureVenue;
