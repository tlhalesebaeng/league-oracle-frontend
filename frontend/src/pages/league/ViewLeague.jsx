import { useLocation, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui-slice.js';

import View from '../../components/app/View';

const Leagues = () => {
    const params = useParams();
    const location = useLocation();
    const dispatch = useDispatch();
    dispatch(uiActions.showAuthButtons());

    // we will get the league standings, fixtures and results
    // from the backend using the leagueId that comes from the params
    const league = [
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

    const results = [
        {
            id: 'r1',
            homeTeam: 'Team A',
            homeScore: 4,
            awayTeam: 'Team B',
            awayScore: 1,
            date: '10-01-2024',
        },
        {
            id: 'r2',
            homeTeam: 'Team A',
            homeScore: 4,
            awayTeam: 'Team B',
            awayScore: 1,
            date: '10-01-2024',
        },
        {
            id: 'r3',
            homeTeam: 'Team A',
            homeScore: 4,
            awayTeam: 'Team B',
            awayScore: 1,
            date: '10-01-2024',
        },
        {
            id: 'r4',
            homeTeam: 'Team A',
            homeScore: 4,
            awayTeam: 'Team B',
            awayScore: 1,
            date: '10-01-2024',
        },
    ];

    return (
        <View
            leagueDetails={location.state}
            leagueStandings={league}
            leagueFixtures={fixtures}
            leagueResults={results}
        />
    );
};

export default Leagues;
