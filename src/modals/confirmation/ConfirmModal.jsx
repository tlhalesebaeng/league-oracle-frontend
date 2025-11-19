import { useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui/ui-slice.js';

import Button from '../../components/app/button/Button.jsx';
import './ConfirmModal.css';

const ConfirmModal = ({ oldItems, newItems, onConfirm }) => {
    const dispatch = useDispatch();

    // We use 4 here because of the assumption that the characters of the new different items
    // Cannot exceed 4 character i.e no id of t100 can exist, we cannot have 100 teams in a league
    const differentItems = newItems.filter((item) => item.id.length <= 4); // different items that are not there in old items

    const deletedItems = []; // Items that are no longer there in the new items array
    const renamedItems = []; // Items that have different names but same id
    oldItems.forEach((item) => {
        let found = false;
        for (let i = 0; i < newItems.length; i++) {
            if (item.id === newItems[i].id) {
                found = true;

                if (item.name !== newItems[i].name) {
                    // The name was changed
                    const nameChanges = {
                        id: item.id,
                        oldName: item.name,
                        newName: newItems[i].name,
                    };
                    renamedItems.push(nameChanges);
                }

                break;
            }
        }

        if (!found) deletedItems.push(item);
    });

    const data = {
        renamed: renamedItems,
        added: differentItems,
        deleted: deletedItems,
    };

    const handleCancel = () => {
        dispatch(uiActions.hideConfirmModal());
    };

    // TODO: Change the list to be a table so that the data is structured nicely
    return (
        <div className="edit-teams-modal">
            <h2>Confirm changes</h2>
            <ul className="edit-teams-modal__changes">
                {differentItems.map((item) => (
                    <li key={item.id}>
                        <p>ADDED :</p>
                        <span>{item.name}</span>
                    </li>
                ))}
                {renamedItems.map((item) => (
                    <li key={item.id}>
                        <p>RENAMED :</p>
                        <span>{item.oldName}</span> to{' '}
                        <span>{item.newName}</span>
                    </li>
                ))}
                {deletedItems.map((item) => (
                    <li key={item.id}>
                        <p>DELETED :</p>
                        <span>{item.name}</span>
                    </li>
                ))}
            </ul>
            <div className="edit-teams-modal__buttons">
                <div className="btn-confirm-edit-teams">
                    <Button onClick={() => onConfirm(data)} type="confirm">
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
