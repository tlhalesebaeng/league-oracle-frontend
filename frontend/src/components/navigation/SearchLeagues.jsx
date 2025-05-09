import { useState } from 'react';
import Modal from '../modal/Modal.jsx';
import Backdrop from '../modal/Backdrop.jsx';

const SearchLeagues = () => {
    const [showModal, setShowModal] = useState(false);
    const handleSearch = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
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
