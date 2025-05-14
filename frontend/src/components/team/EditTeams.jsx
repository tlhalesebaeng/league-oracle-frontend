import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Input from '../../utils/Input.jsx';
import Button from '../../utils/Button.jsx';
import Backdrop from '../modal/Backdrop.jsx';
import Modal from '../modal/Modal.jsx';
import ConfirmModal from './confirmModal/ConfirmModal.jsx';
import binImg from '../../assets/bin.png';
import './EditTeams.css';
import { uiActions } from '../../store/ui-slice';

const EditTeams = ({ teams }) => {
    const showModal = useSelector((state) => state.ui.confirmModalShown);
    const dispatch = useDispatch();
    const [leagueTeams, setLeagueTeams] = useState([...(teams || [])]);

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
        setLeagueTeams((prevTeams) => [...prevTeams, {}]);
    };

    const handleSaveChanges = () => {
        // open a modal and ask the user for confirmation of changes
        dispatch(uiActions.showConfirmModal());
    };

    const handleCancelChanges = () => {
        console.log('Prop teams', teams);
        console.log('State teams', leagueTeams);
        setLeagueTeams(teams);
    };

    const handleCloseModal = () => {
        dispatch(uiActions.hideConfirmModal());
    };

    return (
        <section className="edit-teams">
            {showModal && <Backdrop onClose={handleCloseModal} />}
            {showModal && (
                <Modal>
                    <ConfirmModal oldItems={teams} newItems={leagueTeams} />
                </Modal>
            )}
            {leagueTeams.map((leagueTeam, index) => (
                <div key={leagueTeam.id} className="edit-teams__input">
                    <Input
                        onInputChange={(event) =>
                            handleInputChange(index, event.target.value)
                        }
                        value={leagueTeam.name}
                        imgSrc={binImg}
                        onImageClick={() => handleDeleteTeam(index)}
                        placeholder={`Team ${index + 1}`}
                    />
                </div>
            ))}
            <section className="edit-teams__buttons">
                <div className="btn-add-team">
                    <Button onClick={handleAddTeam} type="no-bg">
                        Add team
                    </Button>
                </div>
                <div className="edit-teams__changes">
                    <div className="btn-save">
                        <Button onClick={handleSaveChanges}>Save</Button>
                    </div>
                    <div className="btn-cancel">
                        <Button onClick={handleCancelChanges} type="no-bg">
                            Cancel
                        </Button>
                    </div>
                </div>
            </section>
        </section>
    );
};

export default EditTeams;
