import { useDispatch, useSelector } from 'react-redux';

import { uiActions } from '../../store/ui/ui-slice.js';

import Input from '../../utils/Input.jsx';
import Backdrop from '../modal/Backdrop.jsx';
import Modal from '../modal/Modal.jsx';
import ConfirmModal from './confirmModal/ConfirmModal.jsx';
import binImg from '../../assets/bin.png';
import './EditTeams.css';

const EditTeams = ({ teams, handlers }) => {
    const showModal = useSelector((state) => state.ui.confirmModalShown);
    const dispatch = useDispatch();

    const { oldTeams, newTeams } = teams;
    const { onConfirm, onInputChange, onDeleteTeam } = handlers;

    const handleCloseModal = () => {
        dispatch(uiActions.hideConfirmModal());
    };

    return (
        <section className="edit-teams">
            {showModal && <Backdrop onClose={handleCloseModal} />}
            {showModal && (
                <Modal>
                    <ConfirmModal
                        onConfirm={onConfirm}
                        oldItems={oldTeams}
                        newItems={newTeams}
                    />
                </Modal>
            )}
            {newTeams.map((leagueTeam, index) => (
                <div key={leagueTeam._id} className="edit-teams__input">
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
