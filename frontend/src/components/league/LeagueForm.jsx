import { useState } from 'react';

import Input from '../../utils/Input.jsx';
import Button from '../../utils/Button.jsx';
import binImg from '../../assets/bin.png';
import './LeagueForm.css';

const LeagueForm = ({ onSubmit }) => {
    const [teams, setTeams] = useState(['', '']);

    const handleChange = (index, value) => {
        setTeams((prevTeams) => {
            const newTeams = [...prevTeams];
            newTeams[index] = value;
            return newTeams;
        });
    };

    const handleAddTeam = (event) => {
        event.preventDefault();
        setTeams((prevTeams) => [...prevTeams, '']);
    };

    const handleDeleteTeam = (index) => {
        setTeams((prevTeams) => prevTeams.filter((_, i) => i !== index));
    };

    return (
        <form className="league-form">
            <section className="league-name">
                <Input label="League name" placeholder="My ultimate league" />
            </section>
            <p className="message">
                Please add teams below. At least 2 teams are required.
            </p>
            {teams.map((team, index) => {
                // Don't show delete buttons for first 2 teams since they are compulsory
                const deleteTeam = () => handleDeleteTeam(index);
                return (
                    <section key={index} className="teams">
                        <Input
                            onInputChange={(event) =>
                                handleChange(index, event.target.value)
                            }
                            value={team}
                            imgSrc={index > 1 ? binImg : undefined}
                            onImageClick={index > 1 ? deleteTeam : undefined}
                            placeholder={`Team ${index + 1}`}
                        />
                    </section>
                );
            })}
            <section className="buttons">
                <div className="btn-add-team">
                    <Button onClick={handleAddTeam} type="no-bg">
                        Add team
                    </Button>
                </div>
                <div className="btn-create">
                    <Button onClick={(event) => onSubmit(event, teams)}>
                        Create
                    </Button>
                </div>
            </section>
        </form>
    );
};

export default LeagueForm;
