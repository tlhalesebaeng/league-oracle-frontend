import { useState } from 'react';
import InstructionsItem from '../instructions-item/InstructionsItem.jsx';
import './InstructionsList.css';

const InstructionsList = ({ list = [{}] }) => {
    const [shownStep, setShownStep] = useState(list[0].id); // Stores the id of the currently shown instruction / step

    return (
        <ul className="instructions-list">
            {list.map((currStep, index) => {
                // Check if the current step is shown
                const showDesc =
                    currStep.id === shownStep && currStep.id != undefined;

                return (
                    <InstructionsItem
                        key={currStep.id}
                        showDesc={showDesc}
                        step={currStep}
                        index={index}
                        onSetStep={setShownStep}
                    />
                );
            })}
        </ul>
    );
};

export default InstructionsList;
