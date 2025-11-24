import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useRouteLoaderData } from 'react-router-dom';

import { useFetch } from '../../../hooks/useFetch.js';
import { showAlert } from '../../../store/ui/alert-slice.js';

import Button from '../../app/button/Button.jsx';
import FixtureItem from '../../fixture/fixture-item/FixtureItem.jsx';
import Modal from '../../../modals/modal/Modal.jsx';
import Backdrop from '../../../modals/backdrop/Backdrop.jsx';
import GeneratorModal from '../../../modals/generator/GeneratorModal.jsx';
import './FixtureList.css';

const FixtureList = () => {
    const isAuth = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user);
    const routeData = useRouteLoaderData('league-route');
    const [showModal, setShowModal] = useState(false);
    const params = useParams();
    const { request, error, isLoading } = useFetch();
    const dispatch = useDispatch();
    const [routeFixtures, setRouteFixtures] = useState([...routeData.fixtures]);

    // if there is a change in the route data, update the fixtures
    useEffect(() => {
        setRouteFixtures([...routeData.fixtures]);
    }, [routeData]);

    const league = routeData.league;
    let fixtures = routeFixtures;
    const results = routeData.results;

    if (params.teamId) {
        // we are looking at a team so we should only show fixtures for this team
        fixtures = fixtures.filter((fixture) => {
            const homeTeam = fixture.homeTeam;
            const awayTeam = fixture.awayTeam;
            const id = params.teamId;
            return homeTeam.id === parseInt(id) || awayTeam.id === parseInt(id);
        });
    }

    // check if the user is the league creator to be able to edit the league
    const isCreator = league.creator === user.id;

    const handleGenerateFixtures = () => {
        // verify the league creator and generate league fixtures if there are no results
        setShowModal(true);
    };

    const handleConfirm = async () => {
        // close the modal
        setShowModal(false);

        // send the request (we will only support home and away fixtures for now)
        const response = await request(
            `/fixtures?leagueId=${league.id}`,
            'post'
        );

        if (response) {
            // set fixtures to be the newly created fixtures
            setRouteFixtures(response.data);

            // show success alert
            dispatch(showAlert('success', 'Season fixtures generated'));
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    // Define a boolean to determine whether we should map through the list of fixtures
    const showFixtures = fixtures && fixtures.length !== 0;

    // Define a boolean to determine if the generate fixtures button should be showed
    const showGenerateButton =
        isAuth && isCreator && !params.teamId && results.length === 0;

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
                {showFixtures &&
                    fixtures.map((fixture) => (
                        <FixtureItem
                            leagueId={league.id}
                            key={fixture.id}
                            fixture={fixture}
                        />
                    ))}
                {!showFixtures && (
                    <li className="no-fixtures">
                        <p>No fixtures found</p>
                        {error && <p className="error-message">{error}</p>}
                        {showGenerateButton && (
                            <div className="no-fixture__btn-generate">
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
