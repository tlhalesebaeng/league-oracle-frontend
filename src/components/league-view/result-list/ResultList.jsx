import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams, useRouteLoaderData } from 'react-router-dom';

import ResultItem from '../result-item/ResultItem.jsx';
import Button from '../../app/button/Button.jsx';
import Modal from '../../../modals/modal/Modal.jsx';
import Backdrop from '../../../modals/backdrop/Backdrop.jsx';
import InstructionModal from '../../../modals/instruction/InstructionModal.jsx';
import './ResultList.css';

const ResultList = () => {
    const isAuth = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user);
    const [showModal, setShowModal] = useState(false);
    let { results, league } = useRouteLoaderData('league-route');
    const navigate = useNavigate();
    const params = useParams();

    // check if the user is the league creator to be able to edit the result
    const isCreator = league.creator === user.id;

    if (params.teamId) {
        // we are looking at the team so we should only show results for this team
        results = results.filter((result) => {
            const homeTeam = result.homeTeam;
            const awayTeam = result.awayTeam;
            const id = params.teamId;
            return homeTeam.id === id || awayTeam.id === id;
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

    const handleEditResult = (resultId) => {
        navigate({
            pathname: '/results/edit',
            search: `?resultId=${resultId}&leagueId=${league.id}`,
        });
    };

    const resultProps = {
        onEdit: handleEditResult,
        isAuth,
        isCreator,
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
                        <ResultItem
                            key={result.id}
                            result={result}
                            {...resultProps}
                        />
                    ))}
                {(!results || results.length === 0) && (
                    <li className="no-results">
                        <p>No results found</p>
                        {isAuth && isCreator && (
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
