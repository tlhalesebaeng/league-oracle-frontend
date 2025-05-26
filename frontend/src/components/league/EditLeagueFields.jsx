import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLoaderData, useNavigate } from 'react-router-dom';

import { useFetch } from '../../hooks/useFetch.js';
import { uiActions } from '../../store/ui/ui-slice.js';

import EditField from '../app/EditField.jsx';
import EditTeams from '../team/EditTeams.jsx';
import Button from '../../utils/Button.jsx';
import Backdrop from '../modal/Backdrop.jsx';
import Modal from '../modal/Modal.jsx';
import ConfirmModal from './confirmModal/ConfirmModal.jsx';
import './EditLeagueFields.css';

const EditLeagueFields = () => {
    const league = useLoaderData();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { request, error, isLoading } = useFetch();
    const [leagueName, setLeagueName] = useState(league.name);
    const showModal = useSelector((state) => state.ui.confirmModalShown);
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
        // close the confirm modal so that the loading state can be shown on this component
        dispatch(uiActions.hideConfirmModal());

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

    const handleCloseModal = () => {
        dispatch(uiActions.hideConfirmModal());
    };

    // checks to disable the save button
    let disableSave = false;
    if (leagueTeams.length < 2) disableSave = true;
    else {
        // TODO: Improve this (linear) search algorithm
        // when there is a team with no name
        for (let i = 0; i < leagueTeams.length; i++) {
            if (!leagueTeams[i].name) {
                disableSave = true;
                break;
            }
        }
    }

    // disable the save buttons when its not and there are no changes found
    if (!disableSave) {
        let changeFound = false;
        // here we are sure that the lengths are equal since we disable save when lengths are not equal
        if (league.name !== leagueName) changeFound = true;
        else if (league.teams.length !== leagueTeams.length) changeFound = true;
        else {
            for (let i = 0; i < leagueTeams.length; i++) {
                if (league.teams[i].name !== leagueTeams[i].name) {
                    changeFound = true;
                    break;
                }
            }
        }

        if (!changeFound) {
            disableSave = true;
        }
    }

    // add league name change to the list of items
    const oldItems = [...league.teams, { _id: league._id, name: league.name }];
    const newItems = [...leagueTeams, { _id: league._id, name: leagueName }];

    return (
        <>
            {showModal && <Backdrop onClose={handleCloseModal} />}
            {showModal && (
                <Modal>
                    <ConfirmModal
                        onConfirm={handlePersistChanges}
                        oldItems={oldItems}
                        newItems={newItems}
                    />
                </Modal>
            )}
            <EditField
                onInputChange={(value) => setLeagueName(value)}
                tag="h2"
                placeholder={league.name}
                value={leagueName}
            />

            <EditTeams
                teams={leagueTeams}
                onInputChange={handleInputChange}
                onDeleteTeam={handleDeleteTeam}
            />

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
