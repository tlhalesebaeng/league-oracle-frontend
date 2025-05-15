import Card from '../../components/app/Card.jsx';
import LeagueName from '../../components/league/LeagueName.jsx';
import EditTeams from '../../components/team/EditTeams.jsx';

const EditLeague = () => {
    // the teams and the league name will come from the get league route
    const leagueName = 'My buff leagues';
    const leagueTeams = [
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
            name: 'TS first team',
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
            name: 'TS second team',
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
            name: 'TS third team',
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

    return (
        <main>
            <Card className="large-width">
                <LeagueName leagueName={leagueName} />
                <EditTeams teams={leagueTeams} />
            </Card>
        </main>
    );
};

export default EditLeague;
