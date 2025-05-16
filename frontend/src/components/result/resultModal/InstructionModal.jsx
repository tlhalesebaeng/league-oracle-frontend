import Button from '../../../utils/Button';
import './InstructionModal.css';

const InstructionModal = ({ onClose }) => {
    return (
        <section className="instruction-modal__content">
            <h2>Add result</h2>
            <p>
                Please click <span>versus</span> on the fixture you want to add
                a result for.
            </p>
            <div>
                <Button onClick={onClose}>Okay</Button>
            </div>
        </section>
    );
};

export default InstructionModal;
