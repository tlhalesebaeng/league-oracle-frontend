import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useRouteLoaderData } from 'react-router-dom';

import { useFetch } from '../../hooks/useFetch.js';
import { showAlert } from '../../store/ui/alert-slice.js';

import Button from '../../utils/Button.jsx';
import FixtureItem from './FixtureItem.jsx';
import Modal from '../modal/Modal.jsx';
import Backdrop from '../modal/Backdrop.jsx';
import GeneratorModal from './generatorModal/GeneratorModal.jsx';
import './FixtureList.css';

const FixtureList = () => {
    const isAuth = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user);
    const routeData = useRouteLoaderData('league-route');
    const [showModal, setShowModal] = useState(false);
    const params = useParams();
    const { request, error, isLoading } = useFetch();
    const dispatch = useDispatch();
    const [routeFixtures, setRotueFixtures] = useState([...routeData.fixtures]);

    const league = routeData.league;
    let fixtures = routeFixtures;

    if (params.teamId) {
        // we are looking at a team so we should only show fixtures for this team
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

    const handleConfirm = async () => {
        // close the modal
        setShowModal(false);

        // send the request (we will only support home and away fixtures for now)
        const response = await request(
            `/fixtures?leagueId=${league._id}&fixtureType=homeAndAway`,
            'post'
        );

        if (response) {
            // set fixtures to be the newly created fixtures
            setRotueFixtures(response.data.fixtures);

            // show success alert
            dispatch(showAlert('success', 'Season fixtures generated'));
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            {showModal && <Backdrop onClose={handleCloseModal} />}
            {showModal && (
                <Modal>
                    <GeneratorModal
                        onConfirm={handleConfirm}
                        onClose={handleCloseModal}
                    />
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
                        {error && <p className="error-message">{error}</p>}
                        {isAuth && isCreator && (
                            <div>
                                <Button
                                    disabled={isLoading}
                                    onClick={handleGenerateFixtures}
                                    loading={isLoading}
                                >
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
