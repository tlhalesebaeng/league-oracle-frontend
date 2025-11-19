import Input from '../../../components/app/input/Input.jsx';
import binImg from '../../../assets/bin.png';
import './EditTeams.css';

const EditTeams = ({ teams, onInputChange, onDeleteTeam }) => {
    return (
        <section className="edit-teams">
            {teams.map((leagueTeam, index) => (
                <div key={leagueTeam.id} className="edit-teams__input">
                    <Input
                        onInputChange={(event) =>
                            onInputChange(index, event.target.value)
                        }
                        value={leagueTeam.name || ''}
                        imgSrc={binImg}
                        onImageClick={() => onDeleteTeam(index)}
                        placeholder={`Team ${index + 1}`}
                    />
                </div>
            ))}
        </section>
    );
};

export default EditTeams;
