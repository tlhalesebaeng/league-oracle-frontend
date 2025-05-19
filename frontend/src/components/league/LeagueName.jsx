import { useLoaderData } from 'react-router-dom';
import EditField from '../app/EditField';
import './LeagueName.css';

const LeagueName = () => {
    const league = useLoaderData();

    return (
        <section className="edit-league-name">
            <EditField tag="h2" name={league.name} />
        </section>
    );
};

export default LeagueName;
