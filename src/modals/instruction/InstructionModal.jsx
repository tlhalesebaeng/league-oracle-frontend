import Button from '../../components/app/button/Button';
import './InstructionModal.css';

const InstructionModal = ({ onClose }) => {
    return (
        <section className="instruction-modal__content">
            <h2>Add result</h2>
            <p>
                Please click <span>versus</span> on the fixture you want to add
                a result for.
            </p>
            <div className="instruction-modal__buttons">
                <div className="btn-confirm-instruction">
                    <Button type="confirm" onClick={onClose}>
                        Okay
                    </Button>
                </div>
                <div className="btn-cancel-instruction">
                    <Button type="cancel" onClick={onClose}>
                        Cancel
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default InstructionModal;
