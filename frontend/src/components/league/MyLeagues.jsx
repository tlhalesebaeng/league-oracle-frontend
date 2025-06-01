import { useNavigate } from 'react-router-dom';

import Button from '../../utils/Button.jsx';
import Spinner from '../app/Spinner.jsx';
import './MyLeagues.css';

const MyLeagues = ({ leagues, loading }) => {
    const navigate = useNavigate();

    const handleCreate = () => {
        navigate('/leagues/create');
    };

    // this will short long names (24+ character) by adding dots after some characters
    const shortenName = (name) => {
        if (name.length < 24) {
            return name;
        }

        let result = '';
        for (let i = 0; i < 24; i++) {
            result += name[i];
        }
        result += '...';

        return result;
    };

    if (loading) {
        return (
            <aside className="my-leagues no-leagues">
                <div className="my-leagues__spinner spinner__wrapper">
                    <Spinner />
                </div>
            </aside>
        );
    }

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
                {leagues.map((league) => {
                    const name = shortenName(league.name);
                    return (
                        <li
                            onClick={() => navigate(`/leagues/${league._id}`)}
                            key={league._id}
                        >
                            {name}
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
};

export default MyLeagues;
