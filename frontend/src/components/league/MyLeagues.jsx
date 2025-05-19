import { useNavigate } from 'react-router-dom';

import Button from '../../utils/Button.jsx';
import './MyLeagues.css';

const MyLeagues = ({ leagues }) => {
    const navigate = useNavigate();

    const handleCreate = () => {
        navigate('/leagues/create');
    };

    if (!leagues || leagues.length === 0) {
        return (
            <aside className="my-leagues no-leagues">
                <p>No leagues found</p>
                <section>
                    <Button onClick={handleCreate}>Create</Button>
                </section>
            </aside>
        );
    }

    return (
        <aside className="my-leagues">
            <h3>My leagues</h3>
            <ul>
                {leagues.map((league) => (
                    <li
                        onClick={() => navigate(`/leagues/${league._id}`)}
                        key={league._id}
                    >
                        {league.name}
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default MyLeagues;
