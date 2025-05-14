import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { uiActions } from '../../../store/ui-slice.js';

import Button from '../../../utils/Button.jsx';
import './ConfirmModal.css';

const ConfirmModal = ({ oldItems, newItems }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleConfirm = () => {
        dispatch(uiActions.hideConfirmModal());
        navigate('/leagues/l3');
    };

    return (
        <div className="confirm-modal">
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
            <section className="confirm-modal__btn">
                <Button onClick={handleConfirm}>Confirm</Button>
            </section>
        </div>
    );
};

export default ConfirmModal;
