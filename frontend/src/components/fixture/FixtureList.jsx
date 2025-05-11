import FixtureItem from './FixtureItem';
import './FixtureList.css';

const FixtureList = () => {
    const fixtures = [
        {
            id: 'f1',
            number: '#123',
            awayTeam: 'Team A',
            homeTeam: 'Team B',
            date: '10-01-2024',
            time: '15:00',
            venue: 'All nation field',
            field: 'Field A',
        },
        {
            id: 'f2',
            number: '#123',
            awayTeam: 'Team A',
            homeTeam: 'Team B',
            date: '10-01-2024',
            time: '15:00',
            venue: 'All nation field',
            field: 'Field A',
        },
        {
            id: 'f3',
            number: '#123',
            awayTeam: 'Team A',
            homeTeam: 'Team B',
            date: '10-01-2024',
            time: '15:00',
            venue: 'All nation field',
            field: 'Field A',
        },
        {
            id: 'f4',
            number: '#123',
            awayTeam: 'Team A',
            homeTeam: 'Team B',
            date: '10-01-2024',
            time: '15:00',
            venue: 'All nation field',
            field: 'Field A',
        },
    ];
    return (
        <ul className="fixture-list">
            {fixtures.map((fixture) => (
                <FixtureItem key={fixture.id} fixture={fixture} />
            ))}
        </ul>
    );
};

export default FixtureList;
