import Card from '../../../../components/app/card/Card.jsx';
import './InstructionsItem.css';

const InstructionsItem = ({ showDesc, step = {}, index, onSetStep }) => {
    const cardClass = showDesc ? ' shown' : '';
    return (
        <Card
            className={cardClass + ' instructions-item__card'}
            onClick={() => onSetStep(step.id)}
        >
            <li>
                <div className="instructions-item__title">
                    <p>{index + 1}</p>
                    <h3>{step.title}</h3>
                </div>
                {showDesc && (
                    <p className="instructions-item__description">
                        {step.description}
                    </p>
                )}
            </li>
        </Card>
    );
};

export default InstructionsItem;
