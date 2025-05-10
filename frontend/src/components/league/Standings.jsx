import Standing from '../team/Standing';
import './Standings.css';

const Standings = () => {
    // get this from the backend
    const teams = [
        {
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
        {
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
        {
            id: 't3',
            name: 'My Very Buff Team',
            wins: 8,
            draws: 2,
            loses: 0,
            goalsFoward: 16,
            goalsAgainst: 4,
            playedGames: 10,
            points: 20,
            goalDifference: 12,
        },
        {
            id: 't4',
            name: 'TS team',
            wins: 8,
            draws: 2,
            loses: 0,
            goalsFoward: 16,
            goalsAgainst: 4,
            playedGames: 10,
            points: 20,
            goalDifference: 12,
        },
        {
            id: 't5',
            name: 'TS team',
            wins: 8,
            draws: 2,
            loses: 0,
            goalsFoward: 16,
            goalsAgainst: 4,
            playedGames: 10,
            points: 20,
            goalDifference: 12,
        },
        {
            id: 't6',
            name: 'TS team',
            wins: 8,
            draws: 2,
            loses: 0,
            goalsFoward: 16,
            goalsAgainst: 4,
            playedGames: 10,
            points: 20,
            goalDifference: 12,
        },
        {
            id: 't7',
            name: 'TS team',
            wins: 8,
            draws: 2,
            loses: 0,
            goalsFoward: 16,
            goalsAgainst: 4,
            playedGames: 10,
            points: 20,
            goalDifference: 12,
        },
        {
            id: 't8',
            name: 'TS team',
            wins: 8,
            draws: 2,
            loses: 0,
            goalsFoward: 16,
            goalsAgainst: 4,
            playedGames: 10,
            points: 20,
            goalDifference: 12,
        },
        {
            id: 't9',
            name: 'TS team',
            wins: 8,
            draws: 2,
            loses: 0,
            goalsFoward: 16,
            goalsAgainst: 4,
            playedGames: 10,
            points: 20,
            goalDifference: 12,
        },
    ];

    const tableHeaderFields = ['P', 'W', 'D', 'L', 'F', 'A', '+-', 'PTS'];
    return (
        <section className="league-standings">
            <table>
                <thead>
                    <tr>
                        <td className="league-standings__header-field">#</td>
                        <td className="league-standings__space-header"></td>
                        {tableHeaderFields.map((fieldName) => (
                            <td
                                key={fieldName}
                                className="league-standings__header-field"
                            >
                                {fieldName}
                            </td>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {teams.map((team) => (
                        <Standing key={team.id} {...team} />
                    ))}
                </tbody>
            </table>
        </section>
    );
};

export default Standings;
