import Card from '../../components/app/Card.jsx';
import LeagueForm from '../../components/league/LeagueForm.jsx';

const CreateLeague = () => {
    const handleCreate = (event, teams) => {
        event.preventDefault();
        console.log(teams);
    };
    return (
        <main>
            <Card className="large-width">
                <h1>Create new league</h1>
                <LeagueForm onSubmit={handleCreate} />
            </Card>
        </main>
    );
};

export default CreateLeague;
