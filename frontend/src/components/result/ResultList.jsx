import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useRouteLoaderData } from 'react-router-dom';

import ResultItem from './ResultItem.jsx';
import Button from '../../utils/Button.jsx';
import Modal from '../modal/Modal.jsx';
import Backdrop from '../modal/Backdrop.jsx';
import InstructionModal from './resultModal/instructionModal.jsx';
import './ResultList.css';

const ResultList = () => {
    const isAuth = useSelector((state) => state.auth.isAuthenticated);
    const [showModal, setShowModal] = useState(false);
    let { results } = useRouteLoaderData('league-route');
    const params = useParams();

    if (params.teamId) {
        // we are looking at the team so we should only show results for this team
        results = results.filter((result) => {
            const homeTeam = result.homeTeam;
            const awayTeam = result.awayTeam;
            const id = params.teamId;
            return homeTeam._id === id || awayTeam._id === id;
        });
    }

    const handleAddResults = () => {
        // guide the user on how to add a result using a modal
        setShowModal(true);
        // navigate to the fixtures page afterwards
        // TODO: Make the tab on the view page to be an app wide state
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            {showModal && <Backdrop onClose={handleCloseModal} />}
            {showModal && (
                <Modal>
                    <InstructionModal onClose={handleCloseModal} />
                </Modal>
            )}
            <ul className="result-list">
                {results &&
                    results.length !== 0 &&
                    results.map((result) => (
                        <ResultItem key={result._id} result={result} />
                    ))}
                {(!results || results.length === 0) && (
                    <li className="no-results">
                        <p>No results found</p>
                        {/* will verify the league creator later */}
                        {isAuth && (
                            <div>
                                <Button onClick={handleAddResults}>Add</Button>
                            </div>
                        )}
                    </li>
                )}
            </ul>
        </>
    );
};

export default ResultList;
