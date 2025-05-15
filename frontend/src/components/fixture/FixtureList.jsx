import Button from '../../utils/Button';
import FixtureItem from './FixtureItem';
import './FixtureList.css';

const FixtureList = ({ fixtures }) => {
    const handleGenerateFixtures = () => {
        // verify the league creator and generate league fixtures if there are no results
    };

    return (
        <ul className="fixture-list">
            {fixtures &&
                fixtures.length !== 0 &&
                fixtures.map((fixture) => (
                    <FixtureItem key={fixture.id} {...fixture} />
                ))}
            {(!fixtures || fixtures.length === 0) && (
                <li className="no-fixtures">
                    <p>No fixtures found</p>
                    <div>
                        <Button onClick={handleGenerateFixtures}>
                            Generate
                        </Button>
                    </div>
                </li>
            )}
        </ul>
    );
};

export default FixtureList;
