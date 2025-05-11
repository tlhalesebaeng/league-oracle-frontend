import ResultItem from './ResultItem';
import './ResultList.css';

const ResultList = () => {
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
        <ul className="result-list">
            {results.map((result) => (
                <ResultItem key={result.id} result={result} />
            ))}
        </ul>
    );
};

export default ResultList;
