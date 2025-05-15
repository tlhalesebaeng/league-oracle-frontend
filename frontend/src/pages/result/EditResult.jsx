import ResultDetails from '../../components/result/ResultDetails.jsx';

const EditResult = () => {
    const result = {
        id: 'r1',
        homeTeam: 'Team A',
        homeScore: 4,
        awayTeam: 'Team B',
        awayScore: 1,
        date: '10-01-2024',
    };
    return (
        <main>
            <ResultDetails result={result} />
        </main>
    );
};

export default EditResult;
