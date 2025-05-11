import FixtureItem from './FixtureItem';
import './FixtureList.css';

const FixtureList = ({ fixtures }) => {
    return (
        <ul className="fixture-list">
            {fixtures.map((fixture) => (
                <FixtureItem key={fixture.id} {...fixture} />
            ))}
        </ul>
    );
};

export default FixtureList;
