import FixtureDetails from '../../components/fixture/FixtureDetails';

const ViewFixture = () => {
    const fixture = {
        id: 'f4',
        number: '#123',
        awayTeam: {
            id: 't1',
            name: 'Sebaeng Team',
            wins: 8,
            draws: 2,
            loses: 0,
            goalsFoward: 16,
            goalsAgainst: 4,
            playedGames: 10,
            points: 20,
            goalDifference: 12,
        },
        homeTeam: {
            id: 't2',
            name: 'Tlhalefo Sebaeng FC',
            wins: 8,
            draws: 2,
            loses: 0,
            goalsFoward: 16,
            goalsAgainst: 4,
            playedGames: 10,
            points: 20,
            goalDifference: 12,
        },
        date: '10-01-2024',
        time: '15:00',
        venue: 'All nation field',
        field: 'Field A',
    };

    const league = {
        id: 'l1',
        name: 'Most massive league',
    };
    return <FixtureDetails league={league} leagueFixture={fixture} />;
};

export default ViewFixture;
