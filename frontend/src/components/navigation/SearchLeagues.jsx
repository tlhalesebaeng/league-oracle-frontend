import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/ui-slice.js';

import Modal from '../modal/Modal.jsx';
import Backdrop from '../modal/Backdrop.jsx';
import './SearchLeagues.css';

const SearchLeagues = () => {
    const dispatch = useDispatch();
    const showModal = useSelector((state) => state.ui.leaguesModalShown);

    const handleSearch = () => {
        dispatch(uiActions.showLeaguesModal());
    };

    const handleCloseModal = () => {
        dispatch(uiActions.hideLeaguesModal());
    };
    return (
        <>
            {showModal && <Backdrop onClose={handleCloseModal} />}
            {showModal && <Modal />}
            <div onClick={handleSearch} className="search-leagues">
                <p>Search for a league</p>
            </div>
        </>
    );
};

export default SearchLeagues;
