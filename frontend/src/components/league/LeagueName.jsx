import EditField from '../app/EditField';
import './LeagueName.css';

const LeagueName = ({ leagueName }) => {
    return (
        <section className="edit-league-name">
            <EditField tag="h2" name={leagueName} />
        </section>
    );
};

export default LeagueName;
