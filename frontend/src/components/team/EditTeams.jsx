import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLoaderData } from 'react-router-dom';

import { uiActions } from '../../store/ui/ui-slice.js';

import Input from '../../utils/Input.jsx';
import Button from '../../utils/Button.jsx';
import Backdrop from '../modal/Backdrop.jsx';
import Modal from '../modal/Modal.jsx';
import ConfirmModal from './confirmModal/ConfirmModal.jsx';
import binImg from '../../assets/bin.png';
import './EditTeams.css';

const EditTeams = ({ league, onSave, onConfirm, error, isLoading }) => {
    const showModal = useSelector((state) => state.ui.confirmModalShown);
    const dispatch = useDispatch();
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

    const handleCancelChanges = () => {
        setLeagueTeams(league.teams);
    };

    const handleCloseModal = () => {
        dispatch(uiActions.hideConfirmModal());
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

    return (
        <section className="edit-teams">
            {showModal && <Backdrop onClose={handleCloseModal} />}
            {showModal && (
                <Modal>
                    <ConfirmModal
                        onConfirm={onConfirm}
                        oldItems={league.teams}
                        newItems={leagueTeams}
                    />
                </Modal>
            )}
            {leagueTeams.map((leagueTeam, index) => (
                <div key={leagueTeam._id} className="edit-teams__input">
                    <Input
                        onInputChange={(event) =>
                            handleInputChange(index, event.target.value)
                        }
                        value={leagueTeam.name || ''}
                        imgSrc={binImg}
                        onImageClick={() => handleDeleteTeam(index)}
                        placeholder={`Team ${index + 1}`}
                    />
                </div>
            ))}
            {error && (
                <div className="edit-teams__error">
                    <p className="error-message">{error}</p>
                </div>
            )}
            <section className="edit-teams__buttons">
                <div className="btn-add-team">
                    <Button onClick={handleAddTeam} type="no-bg">
                        Add team
                    </Button>
                </div>
                <div className="edit-teams__changes">
                    <div className="btn-save-edit-teams">
                        <Button
                            disabled={isLoading || disableSave}
                            onClick={onSave}
                            type="save"
                        >
                            {isLoading ? 'Loading...' : 'Save'}
                        </Button>
                    </div>
                    <div className="btn-cancel-edit-teams">
                        <Button onClick={handleCancelChanges} type="cancel">
                            Cancel
                        </Button>
                    </div>
                </div>
            </section>
        </section>
    );
};

export default EditTeams;
