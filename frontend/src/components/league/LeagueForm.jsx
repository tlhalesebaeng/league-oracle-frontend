import { useState } from 'react';

import Input from '../../utils/Input.jsx';
import Button from '../../utils/Button.jsx';
import binImg from '../../assets/bin.png';
import './LeagueForm.css';

const LeagueForm = ({ onSubmit, loading }) => {
    const [teams, setTeams] = useState([{ name: '' }, { name: '' }]); // each team should have a name property, this makes it easy to send the request
    const [leagueName, setLeagueName] = useState('');

    const handleInputChange = (index, value) => {
        setTeams((prevTeams) => {
            const newTeams = [...prevTeams];
            newTeams[index] = { name: value };
            return newTeams;
        });
    };

    const handleAddTeam = (event) => {
        event.preventDefault();
        setTeams((prevTeams) => [...prevTeams, { name: '' }]);
    };

    const handleDeleteTeam = (index) => {
        // filter the team using the index only
        setTeams((prevTeams) => prevTeams.filter((_, i) => i !== index));
    };

    // check if there is an empty field in the teams array and disable the create button
    // but do so only if the league name is not empty
    let disabled = false;
    if (!leagueName) {
        disabled = true;
    } else {
        for (let i = 0; i < teams.length; i++) {
            if (!teams[i].name.trim()) {
                disabled = true;
                break;
            }
        }
    }

    return (
        <form className="league-form">
            <section className="league-form__name">
                <Input
                    onInputChange={(event) => setLeagueName(event.target.value)}
                    label="League name"
                    placeholder="My ultimate league"
                    value={leagueName}
                />
            </section>
            <p className="league-form__message">
                Please add teams below. At least 2 teams are required.
            </p>
            {teams.map((team, index) => {
                // Don't show delete buttons for first 2 teams since they are compulsory
                const deleteTeam = () => handleDeleteTeam(index);
                return (
                    <section key={index} className="league-form__teams">
                        <Input
                            onInputChange={(event) =>
                                handleInputChange(index, event.target.value)
                            }
                            value={team.name}
                            imgSrc={index > 1 ? binImg : undefined}
                            onImageClick={index > 1 ? deleteTeam : undefined}
                            placeholder={`Team ${index + 1}`}
                        />
                    </section>
                );
            })}
            <section className="league-form__buttons">
                <div className="btn-add-team">
                    <Button onClick={handleAddTeam} type="no-bg">
                        Add team
                    </Button>
                </div>
                <div className="btn-create">
                    <Button
                        disabled={disabled}
                        onClick={(event) => onSubmit(event, teams, leagueName)}
                        loading={loading}
                    >
                        Create
                    </Button>
                </div>
            </section>
        </form>
    );
};

export default LeagueForm;
