import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLoaderData, useNavigate } from 'react-router-dom';

import { useFetch } from '../../hooks/useFetch.js';
import { uiActions } from '../../store/ui/ui-slice.js';

import EditField from '../app/EditField.jsx';
import EditTeams from '../team/EditTeams.jsx';
import Button from '../../utils/Button.jsx';
import './EditLeagueFields.css';

const EditLeagueFields = () => {
    const league = useLoaderData();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { request, error, isLoading } = useFetch();
    const [leagueName, setLeagueName] = useState(league.name);
    const [leagueTeams, setLeagueTeams] = useState([...(league.teams || [])]);

    const handleInputChange = (index, value) => {
        setLeagueTeams((prevTeams) => {
            const newTeams = [...prevTeams];
            newTeams[index] = { ...newTeams[index], name: value };
            return newTeams;
        });
    };

    const handleDeleteTeam = (index) => {
        setLeagueTeams((prevTeams) => prevTeams.filter((_, i) => i !== index));
    };

    const handleAddTeam = () => {
        // TODO: If there is a new team with the same name as the old one then just use the data
        // of the old team because we cannot have teams of similar names
        setLeagueTeams((prevTeams) => [
            ...prevTeams,
            { _id: `t${prevTeams.length}` }, // we need this dummy id to help react to render a list properly
        ]);
    };

    // persist the changes to the backend
    const handlePersistChanges = async (data) => {
        // use async functions so that we can rename, delete and add without awaiting for each one of this to finish firstly

        const updateLeagueName = async () => {
            if (leagueName !== league.name) {
                // the league name was changed
                await request(`/leagues/${league._id}`, 'patch', {
                    name: leagueName,
                });
            }
        };

        const changeNames = async () => {
            // change the team names if any names were changed
            const renamedTeams = data.renamed;
            for (let i = 0; i < renamedTeams.length; i++) {
                const data = { name: renamedTeams[i].newName };
                await request(
                    `/leagues/${league._id}/teams/${renamedTeams[i]._id}`,
                    'patch',
                    data
                );
            }
        };

        const addTeams = async () => {
            // add teams if there are teams to add
            const addedTeams = data.added;
            for (let i = 0; i < addedTeams.length; i++) {
                const data = { name: addedTeams[i].name };
                await request(`/leagues/${league._id}/teams/`, 'post', data);
            }
        };

        const deleteTeams = async () => {
            // delete teams if there are teams to be deleted
            const deletedTeams = data.deleted;
            for (let i = 0; i < deletedTeams.length; i++) {
                await request(
                    `/leagues/${league._id}/teams/${deletedTeams[i]._id}`,
                    'delete'
                );
            }
        };

        // finished defining functions execute this fuctions
        addTeams();
        changeNames();
        updateLeagueName();
        deleteTeams();
    };

    const handleConfirmChanges = () => {
        dispatch(uiActions.showConfirmModal());
    };

    const handleCancelChanges = () => {
        navigate(`/leagues/${league._id}`);
    };

    // disable the save button when there is an empty name field or number of teams are less than 2
    let disableSave = false;
    if (leagueTeams.length < 2) disableSave = true;
    else {
        // TODO: Improve this (linear) search algorithm
        for (let i = 0; i < leagueTeams.length; i++) {
            if (!leagueTeams[i].name) {
                disableSave = true;
                break;
            }
        }
    }

    // team props of the edit team component
    const teams = {
        oldTeams: league.teams,
        newTeams: leagueTeams,
    };

    // function props of the edit team component
    const handlers = {
        onConfirm: handlePersistChanges,
        onInputChange: handleInputChange,
        onDeleteTeam: handlePersistChanges,
    };

    return (
        <>
            <EditField
                onInputChange={(value) => setLeagueName(value)}
                tag="h2"
                placeholder={league.name}
                value={leagueName}
            />

            <EditTeams teams={teams} handlers={handlers} />

            {error && (
                <div className="edit-teams__error">
                    <p className="error-message">{error}</p>
                </div>
            )}
            <section className="edit-league__buttons">
                <div className="btn-add-team">
                    <Button onClick={handleAddTeam} type="no-bg">
                        Add team
                    </Button>
                </div>
                <div className="edit-league__changes">
                    <div className="btn-save-league">
                        <Button
                            disabled={isLoading || disableSave}
                            onClick={handleConfirmChanges}
                            type="save"
                        >
                            {isLoading ? 'Loading...' : 'Save'}
                        </Button>
                    </div>
                    <div className="btn-cancel-edit-league">
                        <Button onClick={handleCancelChanges} type="cancel">
                            Cancel
                        </Button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default EditLeagueFields;
