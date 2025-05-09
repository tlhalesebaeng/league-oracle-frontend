import { useParams } from 'react-router-dom';

const Leagues = () => {
    const params = useParams();

    return (
        <main>
            <h2>Details of league {params.leagueId}</h2>
        </main>
    );
};

export default Leagues;
