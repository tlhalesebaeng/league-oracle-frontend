import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useRouteLoaderData } from 'react-router-dom';

import Button from '../../utils/Button.jsx';
import FixtureItem from './FixtureItem.jsx';
import Modal from '../modal/Modal.jsx';
import Backdrop from '../modal/Backdrop.jsx';
import GeneratorModal from './generatorModal/GeneratorModal.jsx';
import './FixtureList.css';

const FixtureList = () => {
    const isAuth = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user);
    let { fixtures, league } = useRouteLoaderData('league-route');
    const [showModal, setShowModal] = useState(false);
    const params = useParams();

    if (params.teamId) {
        // we are looking at the team so we should only show fixtures for this team
        fixtures = fixtures.filter((fixture) => {
            const homeTeam = fixture.homeTeam;
            const awayTeam = fixture.awayTeam;
            const id = params.teamId;
            return homeTeam._id === id || awayTeam._id === id;
        });
    }

    // check if the user is the league creator to be able to edit the league
    const isCreator = league.creator === user._id;

    const handleGenerateFixtures = () => {
        // verify the league creator and generate league fixtures if there are no results
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            {showModal && <Backdrop onClose={handleCloseModal} />}
            {showModal && (
                <Modal>
                    <GeneratorModal onClose={handleCloseModal} />
                </Modal>
            )}
            <ul className="fixture-list">
                {fixtures &&
                    fixtures.length !== 0 &&
                    fixtures.map((fixture) => (
                        <FixtureItem
                            leagueId={league._id}
                            key={fixture._id}
                            fixture={fixture}
                        />
                    ))}
                {(!fixtures || fixtures.length === 0) && (
                    <li className="no-fixtures">
                        <p>No fixtures found</p>
                        {/* will verify the league creator later */}
                        {isAuth && isCreator && (
                            <div>
                                <Button onClick={handleGenerateFixtures}>
                                    Generate
                                </Button>
                            </div>
                        )}
                    </li>
                )}
            </ul>
        </>
    );
};

export default FixtureList;
