import { useLocation, useParams } from 'react-router-dom';
import Details from '../../components/league/Details';
import Standings from '../../components/league/Standings';

const Leagues = () => {
    const params = useParams();
    const location = useLocation();

    return (
        <main>
            <Details {...location.state} />
            <Standings />
        </main>
    );
};

export default Leagues;
