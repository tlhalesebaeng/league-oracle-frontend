import { useState } from 'react';
import caretImg from '../../../assets/caret.png';
import caretUpImg from '../../../assets/caret-up.png';
import correctImg from '../../../assets/correct-blue.png';
import Card from '../card/Card.jsx';
import './DropDown.css';

const DropDown = ({ defaultValue, options, onSelectValue }) => {
    const [showOptions, setShowOptions] = useState(false);
    const [selectedValue, setSelectedValue] = useState(defaultValue);

    const handleSelectValue = () => {
        // Toggle the show options state buy setting it to the opposite of what it was
        setShowOptions((prevState) => !prevState);
    };

    const handleSetValue = (value, index) => {
        // Set the selected value
        setSelectedValue(value);

        // Hide the options drop down
        setShowOptions(false);

        onSelectValue(value, index);
    };

    return (
        <div className="drop-down">
            <div onClick={handleSelectValue} className="drop-down__selector">
                <p>{selectedValue}</p>
                <img src={showOptions ? caretUpImg : caretImg} />
            </div>
            <Card
                className={`drop-down__options${
                    showOptions ? '' : ' hide-options'
                }`}
            >
                <ul>
                    {options.map((option, index) => {
                        // Check if option is similar to what is selected
                        const isSimilar = option.value === selectedValue;

                        // Derive the styles of the option
                        const styleClass = option.disabled
                            ? 'disabled'
                            : undefined;

                        // Define the function ran when the option is clicked
                        const onOptionClick = () => {
                            // Disable this function when the option is not defined
                            if (!option.disabled) {
                                return handleSetValue(option.value, index);
                            }

                            return null;
                        };

                        return (
                            <li key={option.value} onClick={onOptionClick}>
                                {isSimilar && <img src={correctImg} />}
                                {!isSimilar && <div></div>}
                                <p className={styleClass}>{option.value}</p>
                            </li>
                        );
                    })}
                </ul>
            </Card>
        </div>
    );
};

export default DropDown;
