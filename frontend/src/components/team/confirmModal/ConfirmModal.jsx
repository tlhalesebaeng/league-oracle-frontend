import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { uiActions } from '../../../store/ui/ui-slice.js';

import Button from '../../../utils/Button.jsx';
import './ConfirmModal.css';

const ConfirmModal = ({ oldItems, newItems }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleConfirm = () => {
        dispatch(uiActions.hideConfirmModal());
        navigate('/leagues/l3');
    };

    const handleCancel = () => {
        dispatch(uiActions.hideConfirmModal());
    };

    return (
        <div className="edit-teams-modal">
            <h2>Confirm changes</h2>
            {oldItems.map((item, index) => {
                const oldName = item.name;
                const newName = newItems[index].name;
                if (oldName !== newName) {
                    return (
                        <p>
                            Change: <span>{oldName}</span> to{' '}
                            <span>{newName}</span>
                        </p>
                    );
                }
            })}
            <div className="edit-teams-modal__buttons">
                <div className="btn-confirm-edit-teams">
                    <Button onClick={handleConfirm} type="confirm">
                        Confirm
                    </Button>
                </div>
                <div className="btn-cancel-edit-teams">
                    <Button onClick={handleCancel} type="cancel">
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
