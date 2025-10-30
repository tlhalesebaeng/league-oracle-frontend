import Button from '../../../utils/Button';
import './GeneratorModal.css';

const GeneratorModal = ({ onClose, onConfirm }) => {
    return (
        <section className="confirm-fixture-gen">
            <h2>Confirm</h2>
            <p>
                Please confirm to generate season fixtures. This action cannot
                be reversed.
            </p>
            <section>
                <div className="btn-confirm-gen">
                    <Button onClick={onConfirm} type="save">
                        Confirm
                    </Button>
                </div>
                <div className="btn-cancel-gen">
                    <Button onClick={onClose} type="cancel">
                        Cancel
                    </Button>
                </div>
            </section>
        </section>
    );
};

export default GeneratorModal;
