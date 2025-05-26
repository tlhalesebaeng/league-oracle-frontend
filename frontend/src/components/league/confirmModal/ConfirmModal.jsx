import { useDispatch } from 'react-redux';
import { uiActions } from '../../../store/ui/ui-slice.js';

import Button from '../../../utils/Button.jsx';
import './ConfirmModal.css';

const ConfirmModal = ({ oldItems, newItems, onConfirm }) => {
    const dispatch = useDispatch();

    // we use 4 here because of the assumption that the characters of the new different items
    // cannot exceed 4 character i.e no _id of t100 can exist, we cannot have 100 teams in a league
    const differentItems = newItems.filter((item) => item._id.length <= 4); // different items that are not there in old items

    const deletedItems = []; // items that are no longer there in the new items array
    const renamedItems = []; // items that have different names but same id
    oldItems.forEach((item) => {
        let found = false;
        for (let i = 0; i < newItems.length; i++) {
            if (item._id === newItems[i]._id) {
                found = true;

                if (item.name !== newItems[i].name) {
                    // the name was changed
                    const nameChanges = {
                        _id: item._id,
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
                {renamedItems.map((item) => (
                    <li key={item._id}>
                        Change <span>{item.oldName}</span> to{' '}
                        <span>{item.newName}</span>
                    </li>
                ))}
                {differentItems.map((item) => (
                    <li key={item._id}>
                        Add <span>{item.name}</span>
                    </li>
                ))}
                {deletedItems.map((item) => (
                    <li key={item._id}>
                        Delete <span>{item.name}</span>
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
