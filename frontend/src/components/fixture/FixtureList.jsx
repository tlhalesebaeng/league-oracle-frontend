import { useState } from 'react';
import Button from '../../utils/Button.jsx';
import FixtureItem from './FixtureItem.jsx';
import Modal from '../modal/Modal.jsx';
import Backdrop from '../modal/Backdrop.jsx';
import './FixtureList.css';
import GeneratorModal from './generatorModal.jsx/generatorModal';

const FixtureList = ({ fixtures }) => {
    const [showModal, setShowModal] = useState(false);

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
                        <FixtureItem key={fixture.id} {...fixture} />
                    ))}
                {(!fixtures || fixtures.length === 0) && (
                    <li className="no-fixtures">
                        <p>No fixtures found</p>
                        <div>
                            <Button onClick={handleGenerateFixtures}>
                                Generate
                            </Button>
                        </div>
                    </li>
                )}
            </ul>
        </>
    );
};

export default FixtureList;
