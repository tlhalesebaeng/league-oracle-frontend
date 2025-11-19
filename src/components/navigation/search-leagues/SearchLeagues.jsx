import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../../store/ui/ui-slice.js';

import Modal from '../../../modals/modal/Modal.jsx';
import Backdrop from '../../../modals/backdrop/Backdrop.jsx';
import SearchModal from '../../league-view/searchModal/SearchModal.jsx';
import searchImg from '../../../assets/search.png';
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
            {showModal && (
                <Modal className="search-modal">
                    <SearchModal />
                </Modal>
            )}
            <div onClick={handleSearch} className="search-leagues">
                <img src={searchImg} alt="search-img" />
                <p>Search for a league</p>
            </div>
        </>
    );
};

export default SearchLeagues;
